/* eslint-disable no-console */
import Router from '@koa/router';
import { Prisma } from '@prisma/client';
import prisma from '../client.js';

const router = new Router({ prefix: '/projects' });

router.get('/', async (ctx) => {
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
            name: true,
          },
        },
      },
    });
    ctx.body = projects;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      ctx.throw(e.message);
    }
  }
});

router.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });
  if (project) {
    ctx.body = project;
  } else {
    ctx.status = 404;
    ctx.body = {
      message: `No se ha encontrado el proyecto de id ${id}`,
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

  const {
    name, description, hashtags, access,
  } = ctx.request.body;

  // Optional field (repo)
  let { repo } = ctx.request.body;
  if (!repo) {
    repo = null;
  }

  // Validate input
  if (!name || !description || !hashtags || !access) {
    ctx.status = 400;
    ctx.body = {
      message: 'Faltan campos obligatorios',
    };
    return;
  }

  // Validate that name is unique
  const existingProject = await prisma.project.findUnique({
    where: {
      name,
    },
  });
  if (existingProject) {
    ctx.status = 409;
    ctx.body = {
      message: 'Ya existe un proyecto con ese nombre',
    };
    return;
  }

  // Validate that name is between 1 and 50 characters
  if (name.length < 1 || name.length > 50) {
    ctx.status = 400;
    ctx.body = {
      message: 'El nombre debe tener entre 1 y 50 caracteres',
    };
    return;
  }

  // Validate that description is between 10 and 200 characters
  if (description.length < 10 || description.length > 200) {
    ctx.status = 400;
    ctx.body = {
      message: 'La descripción debe tener entre 10 y 200 caracteres',
    };
    return;
  }

  // Validate that hashtags is between 1 and 50 characters
  if (hashtags.length < 1 || hashtags.length > 50) {
    ctx.status = 400;
    ctx.body = {
      message: 'Los hashtags deben tener entre 1 y 50 caracteres',
    };
    return;
  }

  // Validate that access is OPEN, APPROVAL or CLOSED
  if (!['OPEN', 'APPROVAL', 'CLOSED'].includes(access)) {
    ctx.status = 400;
    ctx.body = {
      message: 'El campo access debe ser OPEN, APPROVAL o CLOSED',
    };
    return;
  }

  // Validate that repo is between 1 and 200 characters
  if (repo && (repo.length < 1 || repo.length > 200)) {
    ctx.status = 400;
    ctx.body = {
      message: 'El repositorio debe tener entre 1 y 200 caracteres',
    };
    return;
  }

  // Create the hashtags array from the hashtags string, removing the # character
  const hashtagsArray = hashtags.split(' ').map((hashtag) => hashtag.trim().replace('#', ''));

  // Create project
  const creatorUsername = ctx.state.user.username;
  const project = await prisma.project.create({
    data: {
      name,
      description,
      repo,
      access,
      creator: {
        connect: {
          username: creatorUsername,
        },
      },
      hashtags: {
        create: hashtagsArray.map((hashtag) => ({
          name: hashtag,
        })),
      },
    },
  });
  ctx.body = project;
  ctx.status = 201;
});

export default router;
