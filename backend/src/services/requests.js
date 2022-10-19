import Router from '@koa/router';

import { PrismaClient } from '@prisma/client';

const router = new Router({ prefix: '/requests' });
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
      message: 'You must be an admin to access this resource',
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
      message: 'You must be an admin to access this resource',
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
      message: 'You must be an admin to access this resource',
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
      message: `Request ${id} not found`,
    };
  }
});

// Create a new request
router.put('/', async (ctx) => {
  const memberUsername = ctx.state.user.username;
  const { achievementId, description } = ctx.request.body;
  // Check fields
  if (!achievementId || !description) {
    ctx.status = 400;
    ctx.body = {
      message: 'Missing fields',
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
      message: `Achievement ${achievementId} not found`,
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
      message: `Member ${memberUsername} already has achievement ${achievementId}`,
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
      memberUsername,
      achievementId,
      description,
      openedAt: new Date(),
      state: 'OPEN',
    },
  });
  ctx.status = 201;
  ctx.body = newRequest;
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
  const request = await prisma.request.findUnique({
    where: {
      id,
    },
  });
  if (request) {
    await prisma.request.delete({
      where: {
        id,
      },
    });
    ctx.status = 204;
  } else {
    ctx.status = 404;
    ctx.body = {
      message: `Request ${id} not found`,
    };
  }
});

// Approve or reject a request, giving the user the achievement if approved
router.patch('/:id', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'You must be an admin to access this resource',
    };
    return;
  }

  const { id } = ctx.params;
  const { approved } = ctx.request.body;

  // Check that correct fields are provided
  if (approved === undefined) {
    ctx.status = 400;
    ctx.body = {
      message: 'Missing required fields (approved)',
    };
    return;
  }

  // Check that approved is a boolean
  if (typeof approved !== 'boolean') {
    ctx.status = 400;
    ctx.body = {
      message: 'Approved must be a boolean',
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
      message: `Request ${id} not found`,
    };
    return;
  }
  if (request.state !== 'OPEN') {
    ctx.status = 400;
    ctx.body = {
      message: `Request ${id} is not open`,
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
    await prisma.request.update({
      where: {
        id,
      },
      data: {
        state: approved ? 'APPROVED' : 'REJECTED',
      },
    });
    ctx.body = {
      message: `Request ${id} ${approved ? 'approved' : 'rejected'} successfully`,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: `Request ${id} not found`,
    };
  }
});

export default router;
