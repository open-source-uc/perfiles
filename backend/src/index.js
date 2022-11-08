/* eslint-disable no-console */
import Koa from 'koa';

import Router from '@koa/router';
import koaBody from 'koa-body';
import json from 'koa-json';
import jwt from 'koa-jwt';

import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

import publicRouter from './services/public.js';
import authRouter from './services/auth.js';
import achievementsRouter from './services/achievements.js';
import membersRouter from './services/members.js';
import requestsRouter from './services/requests.js';
import applicantsRouter from './services/applicants.js';

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

// Body parsing
app.use(koaBody(
  // Enable multipart
  { multipart: true, jsonLimit: '5mb', formidable: { multiples: false, maxFieldsSize: 50 * 1024 * 1024 } },
));

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

// Authentication
app.use(authRouter.routes()).use(authRouter.allowedMethods());

// Public routes
app.use(publicRouter.routes()).use(publicRouter.allowedMethods());

// PROTECTED ROUTES

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

// Protect routes using JWT
app.use(jwt({ secret: process.env.JWT_SECRET }));

// Achievements
app.use(achievementsRouter.routes()).use(achievementsRouter.allowedMethods());
// Members
app.use(membersRouter.routes()).use(membersRouter.allowedMethods());
// Requests
app.use(requestsRouter.routes()).use(requestsRouter.allowedMethods());
// Applicants
app.use(applicantsRouter.routes()).use(applicantsRouter.allowedMethods());

const port = process.env.PORT || 3100;

app.listen(port, () => console.log(`
🚀 Server ready at: http://localhost:${port}`));
