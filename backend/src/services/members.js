import Router from '@koa/router';

import { PrismaClient } from '@prisma/client';

const router = new Router({ prefix: '/members' });
const prisma = new PrismaClient();

router.get('/', async (ctx) => {
  const members = await prisma.member.findMany();
  ctx.body = members;
});

router.get('/:username', async (ctx) => {
  const { username } = ctx.params;
  const member = await prisma.member.findUnique({
    where: {
      username,
    },
  });
  if (member) {
    ctx.body = member;
  } else {
    ctx.status = 404;
    ctx.body = {
      message: `Member ${username} not found`,
    };
  }
});

export default router;
