import Router from '@koa/router';

import { PrismaClient } from '@prisma/client';
import jwt from 'koa-jwt';

const router = new Router({ prefix: '/members' });
const prisma = new PrismaClient();

router.get('/', async (ctx) => {
  const members = await prisma.member.findMany({
    include: {
      profile: true,
    },
  });
  ctx.body = members;
});

router.get('/me', async (ctx) => {
  // Get username from JWT
  const { username } = ctx.state.username;
  // Find member by username
  const member = await prisma.member.findUnique({
    where: {
      username,
    },
    include: {
      profile: true,
    },
  });
  ctx.body = member;
});

router.get('/:username', async (ctx) => {
  const { username } = ctx.params;
  const member = await prisma.member.findUnique({
    where: {
      username,
    },
    include: {
      profile: true,
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

router.get('/:username/achievements', async (ctx) => {
  const { username } = ctx.params;
  const member = await prisma.member.findUnique({
    where: {
      username,
    },
  });
  if (member) {
    const achievementsOnMembers = await prisma.achievementsOnMembers.findMany({
      where: {
        memberUsername: username,
      },
      include: {
        achievement: true,
      },
    });
    ctx.body = achievementsOnMembers;
  } else {
    ctx.status = 404;
    ctx.body = {
      message: `Member ${username} not found`,
    };
  }
});

router.get('/:username/requests', async (ctx) => {
  const { username } = ctx.params;
  const member = await prisma.member.findUnique({
    where: {
      username,
    },
  });
  if (member) {
    const request = await prisma.request.findMany({
      where: {
        memberUsername: username,
      },
    });
    ctx.body = request;
  } else {
    ctx.status = 404;
    ctx.body = {
      message: `Member ${username} not found`,
    };
  }
});

export default router;
