/* eslint-disable no-console */
import Router from '@koa/router';

import { PrismaClient } from '@prisma/client';

const router = new Router({ prefix: '/requests' });
const prisma = new PrismaClient();

router.get('/', async (ctx) => {
  // TODO: Add authentication
  // Allow optionally filtering by status
  const { status } = ctx.query;
  const requests = await prisma.request.findMany({
    where: {
      status: status || undefined,
    },
  });
  ctx.body = requests;
});

router.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  const request = await prisma.request.findUnique({
    where: {
      id,
    },
  });
  if (request) {
    ctx.body = request;
  } else {
    ctx.status = 404;
    ctx.body = {
      message: `Request ${id} not found`,
    };
  }
});

router.post('/', async (ctx) => {

export default router;
