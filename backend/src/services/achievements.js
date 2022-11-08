/* eslint-disable no-console */
import Router from '@koa/router';

import { PrismaClient } from '@prisma/client';

import slugify from 'slugify';

import fs from 'fs';

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
      message: `No se ha encontrado el logro de id ${id}`,
    };
  }
});

router.put('/', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'Debes ser un administrador para acceder a este recurso',
    };
    return;
  }

  const creatorUsername = ctx.state.user.username;

  // Idempotently create or update achievement
  const {
    name, description, type, level, image,
  } = ctx.request.body;

  // Optional fields (expiresAt, pointsOverride)
  let { expiresAt, pointsOverride } = ctx.request.body;

  if (!expiresAt) {
    expiresAt = null;
  } else {
    expiresAt = new Date(expiresAt);
  }

  if (!pointsOverride) {
    pointsOverride = null;
  } else {
    pointsOverride = parseInt(pointsOverride, 10);
  }

  // Validate input
  if (!name || !description || !type || !level || !image) {
    ctx.status = 400;
    ctx.body = {
      message: 'Faltan campos obligatorios',
    };
    return;
  }

  // Validate that the name is shorter than 50 characters
  if (name.length > 50) {
    ctx.status = 400;
    ctx.body = {
      message: 'El nombre del logro no puede tener más de 50 caracteres',
    };
    return;
  }

  // Validate that the description is shorter than 500 characters
  if (description.length > 500) {
    ctx.status = 400;
    ctx.body = {
      message: 'La descripción del logro no puede tener más de 500 caracteres',
    };
    return;
  }

  // Load PNG image from base64 string
  // Strip prefix from base64 string
  const base64Image = image.split(';base64,').pop();
  const imageBuffer = Buffer.from(base64Image, 'base64');

  const filename = slugify(name, { lower: true, strict: true });
  const imageURL = `assets/images/badges/${filename}.png`;

  // Write image to file
  fs.writeFileSync(`../frontend/public/${imageURL}`, imageBuffer);

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
    console.error(`⚠️ Error creando/actualizando un logro: ${error}`);
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
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
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
      message: `No se ha encontrado el logro de id ${id}`,
    };
  }
});

export default router;
