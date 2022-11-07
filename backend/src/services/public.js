import Router from '@koa/router';

import { Prisma, PrismaClient } from '@prisma/client';

import getStats from '../utils/stats.js';

const router = new Router({ prefix: '/public' });
const prisma = new PrismaClient();

router.get('/members', async (ctx) => {
  try {
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
    // add a timeout to simulate a slow network
    ctx.body = members;
  } catch (e) {
    // TODO: Standardize error handling
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      ctx.throw(500, e.message);
    }
  }
});

router.get('/members/:username', async (ctx) => {
  const { username } = ctx.params;
  try {
    const member = await prisma.member.findUnique({
      where: { username },
      select: {
        username: true,
        role: true,
        joinedAt: true,
        profile: {
          select: {
            name: true,
            title: true,
            avatarURL: true,
          },
        },
        achievements: {
          select: {
            obtainedAt: true,
            achievement: {
              select: {
                id: true,
                name: true,
                description: true,
                imageURL: true,
                level: true,
              },
            },
          },
        },
      },
    });
    // Also add stats
    const stats = await getStats(username);
    ctx.body = { ...member, stats };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2025') {
        ctx.status = 404;
        ctx.body = { message: 'Member not found' };
      } else {
        ctx.throw(500, e.message);
      }
    }
  }
});

// Achievements

router.get('/achievements', async (ctx) => {
  const achievements = await prisma.achievement.findMany();
  // Exclude mysterious achievements
  ctx.body = achievements.filter((achievement) => achievement.type !== 'MYSTERIOUS');
});

export default router;
