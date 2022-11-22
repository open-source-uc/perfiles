/* eslint-disable no-console */
import Koa from 'koa';

import Router from '@koa/router';
import { koaBody } from 'koa-body';
import json from 'koa-json';
import cors from '@koa/cors';

import { Prisma } from '@prisma/client';
import prisma from './client.js';

const app = new Koa();
const router = new Router();

const development = process.env.NODE_ENV === 'development';

// CORS
app.use(cors({
  origin: (ctx) => {
    // Allow any requests while in development
    if (development) {
      return '*';
    }

    // Otherwise, we only allow requests from our domains
    // Check if the origin is osuc.dev or one of its subdomains
    // Also allow requests from perfiles.pages.dev
    const origin = ctx.request.get('origin');
    const domains = ['osuc.dev', 'perfiles.pages.dev'];
    if (origin) {
      const url = new URL(origin);
      // eslint-disable-next-line no-restricted-syntax
      for (const domain of domains) {
        if (url.hostname.endsWith(`.${domain}`) || url.hostname === domain) {
          return origin;
        }
      }
    }
    return false;
  },
}));

// X-Response-Time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// Logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`ℹ️ ${ctx.method} ${ctx.url} - ${ms} ms`);
});

// Pretty JSON
app.use(json({
  // Enable in development
  pretty: development,
}));

// Body parsing
app.use(koaBody());

router.get('/', async (ctx) => {
  ctx.body = { message: 'Hello World! 👀' };
});

router.get('/health', async (ctx) => {
  // Disable cache
  ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  // Check database connection
  try {
    await prisma.$connect();
    await prisma.$executeRaw`SELECT 1`;
    ctx.status = 200;
    ctx.body = {
      status: 'OK',
    };
  } catch (error) {
    console.error(`⚠️ Health check failed: ${error}`);
    ctx.status = 500;
    ctx.body = {
      status: 'ERROR',
      message: error.message,
    };
  }
});

router.get('/backups', async (ctx) => {
  const backups = await prisma.backup.findMany({
    select: {
      id: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  ctx.body = backups;
});

router.get('/backups/:id', async (ctx) => {
  const { id } = ctx.params;
  try {
    const backup = await prisma.backup.findUniqueOrThrow({
      where: {
        id,
      },
    });
    ctx.body = backup;
  } catch (e) {
    if (e instanceof Prisma.NotFoundError) {
      ctx.status = 404;
      ctx.body = {
        message: 'Backup not found',
      };
    } else {
      console.error(`⚠️ Error getting backup: ${e}`);
      ctx.status = 500;
      ctx.body = {
        message: e.message,
      };
    }
  }
});

router.put('/backups', async (ctx) => {
  // Check that the body is not empty and is of type object
  if (!ctx.request.body || typeof ctx.request.body !== 'object') {
    ctx.status = 400;
    ctx.body = {
      message: 'Invalid request body',
    };
    return;
  }

  // Create backup
  try {
    const backup = await prisma.backup.create({
      data: {
        createdAt: new Date(),
        blob: ctx.request.body,
      },
    });
    ctx.status = 201;
    ctx.body = {
      id: backup.id,
      createdAt: backup.createdAt,
    };
  } catch (e) {
    console.error(`⚠️ Error creating backup: ${e}`);
    ctx.status = 500;
    ctx.body = {
      message: e.message,
    };
  }
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3200;

app.listen(port, () => console.log(`
🚀 Server ready at: http://localhost:${port}`));
