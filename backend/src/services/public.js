import Router from '@koa/router';

import { Prisma, PrismaClient } from '@prisma/client';

import getStats from '../utils/stats.js';
import getProgressionTree from '../utils/progression_nodes.js';

const router = new Router({ prefix: '/public' });
const prisma = new PrismaClient();

router.get('/members', async (ctx) => {
  try {
    let members = await prisma.member.findMany({
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
    members = await Promise.all(members.map(async (member) => {
      const stats = await getStats(member.username);
      return {
        ...member,
        stats,
      };
    }));
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
        created_projects: true,
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
        projects: {
          select: {
            project: {
              select: {
                id: true,
                name: true,
                description: true,
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

router.get('/achievements/progression', async (ctx) => {
  const tree = await getProgressionTree();
  ctx.body = tree;
});

// Projects

router.get('/projects', async (ctx) => {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: false,
        name: true,
        description: true,
        creator: {
          select: {
            username: true,
          },
        },
        repo: true,
        access: true,
        members: {
          select: {
            memberUsername: true,
          },
        },
        hashtags: {
          select: {
            hashtag: true,
          },
        },
      },
    });
    ctx.body = projects;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      ctx.throw(500, e.message);
    }
  }
});

export default router;
