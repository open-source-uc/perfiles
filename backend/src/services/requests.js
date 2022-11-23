import Router from '@koa/router';
import prisma from '../client.js';

import auditLogger from '../utils/audit-logger.js';

const router = new Router({ prefix: '/requests' });

router.get('/', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
    };
    return;
  }

  const requests = await prisma.request.findMany({
    include: {
      achievement: true,
      openedBy: true,
    },
  });
  ctx.body = requests;
});

router.get('/open', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
    };
    return;
  }

  const requests = await prisma.request.findMany({
    where: {
      state: 'OPEN',
    },
    include: {
      achievement: true,
      openedBy: true,
    },
  });
  ctx.body = requests;
});

router.get('/closed', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
    };
    return;
  }

  const requests = await prisma.request.findMany({
    where: {
      state: {
        in: ['REJECTED', 'APPROVED'],
      },
    },
    include: {
      achievement: true,
      openedBy: true,
    },
  });

  ctx.body = requests;
});

router.get('/:id', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
    };
    return;
  }

  const { id } = ctx.params;
  const request = await prisma.request.findUnique({
    where: {
      id,
    },
    include: {
      achievement: true,
      openedBy: true,
    },
  });
  if (request) {
    ctx.body = request;
  } else {
    ctx.status = 404;
    ctx.body = {
      message: `No se ha encontrado la solicitud de id ${id}`,
    };
  }
});

auditLogger.register(
  'requests',
  'create',
  (data, actor) => `El usuario ${actor.username} ha solicitado el logro ${data.achievement.name}`,
);

// Create a new request
router.put('/', async (ctx) => {
  const memberUsername = ctx.state.user.username;
  const { achievementId, description } = ctx.request.body;
  // Check fields
  if (!achievementId || !description) {
    ctx.status = 400;
    ctx.body = {
      message: 'Debes seleccionar un logro válido y escribir una descripción',
    };
    return;
  }
  // Check that the description is shorter than 500 characters
  if (description.length > 1000) {
    ctx.status = 400;
    ctx.body = {
      message: 'La descripción no puede tener más de 1000 caracteres',
    };
    return;
  }

  // Check that the achievement exists
  const achievement = await prisma.achievement.findUnique({
    where: {
      id: achievementId,
    },
  });
  if (!achievement) {
    ctx.status = 400;
    ctx.body = {
      message: `El logro ${achievementId} no existe`,
    };
    return;
  }
  // Check that the member does not already have the achievement
  const achievementOnMember = await prisma.achievementsOnMembers.findFirst({
    where: {
      memberUsername,
      achievementId,
    },
  });
  if (achievementOnMember) {
    ctx.status = 400;
    ctx.body = {
      message: `Ya tienes el logro ${achievementId}!`,
    };
    return;
  }

  // Check that the member does not have an open request for the achievement
  const request = await prisma.request.findFirst({
    where: {
      memberUsername,
      achievementId,
      state: 'OPEN',
    },
  });
  if (request) {
    ctx.status = 200;
    ctx.body = request;
    return;
  }

  // Create the request
  const newRequest = await prisma.request.create({
    data: {
      openedBy: {
        connect: {
          username: memberUsername,
        },
      },
      achievement: {
        connect: {
          id: achievementId,
        },
      },
      description,
      openedAt: new Date(),
      state: 'OPEN',
    },
    include: {
      achievement: true,
    },
  });
  ctx.status = 201;
  ctx.body = newRequest;
  await auditLogger.log('requests', 'create', newRequest, ctx.state.user.username);
});

auditLogger.register(
  'requests',
  'delete',
  (data, actor) => `El admin ${actor.username} ha eliminado la solicitud del logro ${data.achievement.name} hecha por ${data.openedBy.username}`,
);

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
  const request = await prisma.request.findUnique({
    where: {
      id,
    },
    include: {
      achievement: true,
      openedBy: true,
    },
  });
  if (request) {
    await prisma.request.delete({
      where: {
        id,
      },
    });
    ctx.status = 204;
    await auditLogger.log('requests', 'delete', request, ctx.state.user.username);
  } else {
    ctx.status = 404;
    ctx.body = {
      message: `No se ha encontrado la solicitud de id ${id}`,
    };
  }
});

auditLogger.register(
  'requests',
  'approve',
  (data, actor) => `El admin ${actor.username} ha aprobado la solicitud del logro ${data.achievement.name} hecha por ${data.openedBy.username}`,
);

auditLogger.register(
  'requests',
  'reject',
  (data, actor) => `El admin ${actor.username} ha rechazado la solicitud del logro ${data.achievement.name} hecha por ${data.openedBy.username}`,
);

// Approve or reject a request, giving the user the achievement if approved
router.patch('/:id', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
    };
    return;
  }

  const { id } = ctx.params;
  const { approved } = ctx.request.body;

  // Check that correct fields are provided
  if (approved === undefined) {
    ctx.status = 400;
    ctx.body = {
      message: 'Falta el argumento "approved"',
    };
    return;
  }

  // Check that approved is a boolean
  if (typeof approved !== 'boolean') {
    ctx.status = 400;
    ctx.body = {
      message: 'El argumento "approved" debe ser un booleano',
    };
    return;
  }

  const request = await prisma.request.findUnique({
    where: {
      id,
    },
    include: {
      achievement: true,
      openedBy: true,
    },
  });

  // Check that the request exists and is open
  if (!request) {
    ctx.status = 404;
    ctx.body = {
      message: `No se ha encontrado la solicitud de id ${id}`,
    };
    return;
  }
  if (request.state !== 'OPEN') {
    ctx.status = 400;
    ctx.body = {
      message: `La solicitud de id ${id} no está abierta`,
    };
    return;
  }

  if (request) {
    // If the request is approved, give the user the achievement
    if (approved) {
      await prisma.achievementsOnMembers.create({
        data: {
          achievementId: request.achievement.id,
          memberUsername: request.openedBy.username,
          awardedByUsername: ctx.state.user.username,
          obtainedAt: new Date(),
        },
      });
    }
    // Set the request status
    const updatedRequest = await prisma.request.update({
      where: {
        id,
      },
      data: {
        state: approved ? 'APPROVED' : 'REJECTED',
      },
      include: {
        achievement: true,
        openedBy: true,
      },
    });
    ctx.body = {
      message: `La solicitud de id ${id} fue ${approved ? 'aprobada' : 'rechazada'} exitosamente!`,
    };
    ctx.status = 200;
    await auditLogger.log('requests', approved ? 'approve' : 'reject', updatedRequest, ctx.state.user.username);
  } else {
    ctx.status = 404;
    ctx.body = {
      message: `No se ha encontrado la solicitud de id ${id}`,
    };
  }
});

export default router;
