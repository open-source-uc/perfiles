/* eslint-disable no-console */
import Router from '@koa/router';

import { PrismaClient } from '@prisma/client';

const router = new Router({ prefix: '/achievements' });
const prisma = new PrismaClient();

router.get('/', async (ctx) => {
  const achievements = await prisma.achievement.findMany();
  // Exclude mysterious achievements
  ctx.body = achievements.filter((achievement) => achievement.type !== 'MYSTERIOUS');
});

router.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  const achievement = await prisma.achievement.findUnique({
    where: {
      id,
    },
  });
  if (achievement) {
    ctx.body = achievement;
  } else {
    ctx.status = 404;
    ctx.body = {
      message: `Achievement ${id} not found`,
    };
  }
});

router.put('/:id', async (ctx) => {
  // TODO: Add authentication
  // Idempotently create or update achievement
  const { id } = ctx.params;
  const {
    name, description, imageURL, type, level, creatorUsername,
  } = ctx.request.body;
    // Optional fields (expiresAt, pointsOverride)
  const { expiresAt, pointsOverride } = ctx.request.body;

  // Validate input
  if (!name || !description || !imageURL || !type || !level || !creatorUsername) {
    ctx.status = 400;
    ctx.body = {
      message: 'Missing required fields',
    };
    return;
  }
  try {
    const achievement = await prisma.achievement.upsert({
      where: {
        id: Number(id),
      },
      update: {
        name,
        description,
        imageURL,
        type,
        level,
        creatorUsername,
        expiresAt,
        pointsOverride,
      },
      create: {
        id: Number(id),
        name,
        description,
        imageURL,
        type,
        level,
        creatorUsername,
        expiresAt,
        pointsOverride,
      },
    });
    ctx.body = achievement;
  } catch (error) {
    console.error(`⚠️ Error creating/updating achievement: ${error}`);
    ctx.status = 500;
    ctx.body = {
      message: error.message,
    };
  }
});

export default router;
