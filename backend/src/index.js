/* eslint-disable no-console */
import Koa from 'koa';
import Router from '@koa/router';

import koaBody from 'koa-body';
import json from 'koa-json';

import { PrismaClient } from '@prisma/client';

import achievementsRouter from './services/achievements.js';
import membersRouter from './services/members.js';

const app = new Koa();
const router = new Router();
const prisma = new PrismaClient();

const development = process.env.NODE_ENV === 'development';

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

app.use(router.routes()).use(router.allowedMethods());
// Achievements
app.use(achievementsRouter.routes()).use(achievementsRouter.allowedMethods());
// Members
app.use(membersRouter.routes()).use(membersRouter.allowedMethods());

const port = process.env.PORT || 3100;

app.listen(port, () => console.log(`
🚀 Server ready at: http://localhost:${port}`));
