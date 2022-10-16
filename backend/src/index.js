/* eslint-disable no-console */
import Koa from 'koa';

import Router from '@koa/router';
import koaBody from 'koa-body';
import json from 'koa-json';
import jwt from 'koa-jwt';

import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

import authRouter from './services/auth.js';
import achievementsRouter from './services/achievements.js';
import membersRouter from './services/members.js';

dotenv.config();

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

// JWT Error Handling
app.use((ctx, next) => next().catch((err) => {
  if (err.status === 401) {
    ctx.status = 401;
    ctx.body = {
      message: 'Unauthorized, please provide the appropiate Authorization header to get access.',
    };
  } else {
    throw err;
  }
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
app.use(router.routes()).use(router.allowedMethods());
// Login
app.use(authRouter.routes()).use(authRouter.allowedMethods());

// Protect routes using JWT if not in development
if (!development) {
  app.use(jwt({ secret: process.env.JWT_SECRET }));
}

// Achievements
app.use(achievementsRouter.routes()).use(achievementsRouter.allowedMethods());
// Members
app.use(membersRouter.routes()).use(membersRouter.allowedMethods());

const port = process.env.PORT || 3100;

app.listen(port, () => console.log(`
🚀 Server ready at: http://localhost:${port}`));
