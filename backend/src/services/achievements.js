/* eslint-disable no-console */
import Router from '@koa/router';

import { PrismaClient } from '@prisma/client';

import slugify from 'slugify';

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
    name, description, type, level,
  } = ctx.request.body;

  // Optional fields (expiresAt, pointsOverride)
  const { expiresAt, pointsOverride } = ctx.request.body;

  // Validate input
  if (!name || !description || !type || !level) {
    ctx.status = 400;
    ctx.body = {
      message: 'Missing required fields',
    };
    return;
  }

  // Check if a file was uploaded
  if (!ctx.request.files || !ctx.request.files.badge) {
    ctx.status = 400;
    ctx.body = {
      message: 'Missing required file',
    };
    return;
  }

  const { badge } = ctx.request.files;

  // Ensure file is an image
  if (!['image/png', 'image/jpeg'].includes(badge.mimetype)) {
    ctx.status = 400;
    ctx.body = {
      message: 'File must be a PNG or JPEG',
    };
    return;
  }

  // Ensure file is not too large
  if (badge.size > 1000000) {
    ctx.status = 400;
    ctx.body = {
      message: 'File must be less than 1MB',
    };
    return;
  }

  // Save file to public/assets
  // Sanitize filename
  const filename = slugify(name, { lower: true, strict: true });
  // Add extension
  const extension = badge.mimetype.split('/')[1];
  const path = `assets/images/badge${filename}.${extension}`;
  await badge.mv(`../frontend/public/${path}`);

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
          imageURL: path,
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
