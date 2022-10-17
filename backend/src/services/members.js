import Router from '@koa/router';

import { PrismaClient } from '@prisma/client';

import getStats from '../utils/stats.js';

const router = new Router({ prefix: '/members' });
const prisma = new PrismaClient();

router.get('/', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'You must be an admin to access this resource',
    };
    return;
  }

  const members = await prisma.member.findMany({
    include: {
      profile: true,
    },
  });
  ctx.body = members;
});

router.get('/me', async (ctx) => {
  // Get username from JWT
  const { username } = ctx.state.user;
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
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'You must be an admin to access this resource',
    };
    return;
  }

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
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'You must be an admin to access this resource',
    };
    return;
  }
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
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'You must be an admin to access this resource',
    };
    return;
  }
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

router.get('/:username/stats', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'You must be an admin to access this resource',
    };
    return;
  }

  // Get user's achievements
  let { username } = ctx.params;

  // TODO: Make public?
  if (username === 'me') {
    username = ctx.state.user.username;
  }

  ctx.body = await getStats(username);
});

export default router;
