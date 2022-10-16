import Router from '@koa/router';

import { PrismaClient } from '@prisma/client';

const router = new Router({ prefix: '/public' });
const prisma = new PrismaClient();

router.get('/members', async (ctx) => {
  const members = await prisma.member.findMany({
    select: {
      username: true,
      role: true,
      profile: {
        select: {
          name: true,
          title: true,
          avatarURL: true,
        },
      },
    },
  });
  ctx.body = members;
});

export default router;
