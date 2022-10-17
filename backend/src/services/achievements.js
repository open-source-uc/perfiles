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

router.put('/', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'You must be an admin to access this resource',
    };
    return;
  }

  const creatorUsername = ctx.state.user.username;

  // Idempotently create or update achievement
  const {
    name, description, imageURL, type, level,
  } = ctx.request.body;
  // Optional fields (expiresAt, pointsOverride)
  const { expiresAt, pointsOverride } = ctx.request.body;

  // Validate input
  if (!name || !description || !imageURL || !type || !level) {
    ctx.status = 400;
    ctx.body = {
      message: 'Missing required fields',
    };
    return;
  }
  try {
    // Check if achievement already exists
    const existingAchievement = await prisma.achievement.findUnique({
      where: {
        name,
      },
    });

    if (existingAchievement) {
      // Update existing achievement
      const updatedAchievement = await prisma.achievement.update({
        where: {
          name,
        },
        data: {
          description,
          imageURL,
          type,
          expiresAt,
          pointsOverride,
          creator: {
            connect: {
              username: creatorUsername,
            },
          },
          level: {
            connect: {
              name: level,
            },
          },
          createdAt: new Date(),
        },
      });
      ctx.body = updatedAchievement;
      ctx.status = 200;
    } else {
      // Create new achievement
      const newAchievement = await prisma.achievement.create({
        data: {
          name,
          description,
          imageURL,
          type,
          expiresAt,
          pointsOverride,
          creator: {
            connect: {
              username: creatorUsername,
            },
          },
          level: {
            connect: {
              name: level,
            },
          },
          createdAt: new Date(),
        },
      });
      ctx.body = newAchievement;
      ctx.status = 201;
    }
  } catch (error) {
    console.error(`⚠️ Error creating/updating achievement: ${error}`);
    ctx.status = 500;
    ctx.body = {
      message: error.message,
    };
  }
});

router.delete('/:id', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'You must be an admin to access this resource',
    };
    return;
  }

  const { id } = ctx.params;

  // Check if achievement exists
  const existingAchievement = await prisma.achievement.findUnique({
    where: {
      id,
    },
  });

  if (existingAchievement) {
    const deletedAchievement = await prisma.achievement.delete({
      where: {
        id,
      },
    });
    ctx.body = deletedAchievement;
    ctx.status = 200;
  } else {
    ctx.status = 404;
    ctx.body = {
      message: `Achievement ${id} not found`,
    };
  }
});

export default router;
