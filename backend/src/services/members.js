import Router from '@koa/router';

import neatCsv from 'neat-csv';
import fs from 'fs';
import prisma from '../client.js';
import getStats from '../utils/stats.js';
import auditLogger from '../utils/audit-logger.js';

const router = new Router({ prefix: '/members' });

router.get('/', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
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
      created_requests: {
        select: {
          id: true,
          achievement: true,
          openedAt: true,
          state: true,
          description: true,
        },
      },
    },
  });
  ctx.body = member;
});

router.get('/:username', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
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
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
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
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
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
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
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

// User creation / batch import endpoint
// This endpoint is only available to admins

auditLogger.register('members', 'create', (data, actor) => (
  `El usuario ${actor.username} ha creado el usuario ${data.username}`
));

auditLogger.register('members', 'import', (data, actor) => (
  `El usuario ${actor.username} ha importado ${data.length} usuarios`
));

router.put('/', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
    };
    return;
  }

  // Check if the body is an array or a single object
  const { body } = ctx.request;
  const members = Array.isArray(body) ? body : [body];

  // Check for required fields
  const usernameRequiredFields = ['username', 'role', 'profile'];
  const profileRequiredFields = ['name', 'email'];

  const errors = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const member of members) {
    // eslint-disable-next-line no-restricted-syntax
    for (const field of usernameRequiredFields) {
      if (!member[field]) {
        errors.push(`Missing field ${field} in member ${member.username}`);
      }
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const field of profileRequiredFields) {
      if (!member.profile[field]) {
        errors.push(`Missing field ${field} in member ${member.username}`);
      }
    }
  }

  // Create a new member for each object in the array
  const createdMembers = await Promise.all(
    members.map((member) => prisma.member.upsert({
      where: {
        username: member.username,
      },
      create: {
        username: member.username,
        role: member.role,
        joinedAt: new Date(),
        profile: {
          create: {
            name: member.profile.name,
            email: member.profile.email,
            telegramUsername: member.telegramUsername,
            avatarURL: member.avatarURL ? member.avatarURL : `https://avatars.githubusercontent.com/${member.username}`,
          },
        },
      },
      update: {
        role: member.role,
        profile: {
          update: {
            name: member.profile.name,
            email: member.profile.email,
            telegramUsername: member.profile.telegramUsername,
            avatarURL: member.profile.avatarURL ? member.profile.avatarURL : `https://avatars.githubusercontent.com/${member.username}`,
          },
        },
      },
    })),
  );

  ctx.body = createdMembers;
  ctx.status = 201;
  if (members.length > 1) {
    await auditLogger.log('members', 'import', members, ctx.state.user.username);
  } else {
    await auditLogger.log('members', 'create', members[0], ctx.state.user.username);
  }
});

auditLogger.register('members', 'delete', (data, actor) => (
  `El usuario ${actor.username} ha eliminado el usuario ${data.username}`
));

router.delete('/:username', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
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
    await prisma.member.delete({
      where: {
        username,
      },
    });
    ctx.status = 204;
    await auditLogger.log('members', 'delete', member, ctx.state.user.username);
  } else {
    ctx.status = 404;
    ctx.body = {
      message: `Member ${username} not found`,
    };
  }
});

auditLogger.register('members', 'update', (data, actor) => (
  `El usuario ${actor.username} ha modificado el usuario ${data.username}`
));

router.patch('/:username', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
    };
    return;
  }

  const { username } = ctx.params;
  const { body } = ctx.request;

  const member = await prisma.member.findUnique({
    where: {
      username,
    },
  });

  // Allow only the following fields to be updated
  const allowedFields = ['email', 'telegramUsername', 'role', 'profile'];

  // Error if the user tries to update a field that is not allowed
  const invalidFields = Object.keys(body).filter((field) => !allowedFields.includes(field));
  if (invalidFields.length > 0) {
    ctx.status = 400;
    ctx.body = {
      message: `Invalid fields: ${invalidFields.join(', ')}`,
    };
    return;
  }

  if (member) {
    const updatedMember = await prisma.member.update({
      where: {
        username,
      },
      data: {
        ...body,
      },
    });
    ctx.body = updatedMember;
    await auditLogger.log('members', 'update', updatedMember, ctx.state.user.username);
  } else {
    ctx.status = 404;
    ctx.body = {
      message: `Member ${username} not found`,
    };
  }
});

// Receive a CSV file and create members from it
router.put('/import', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
    };
    return;
  }

  // Check if files were uploaded
  if (!ctx.request.files) {
    ctx.status = 400;
    ctx.body = {
      message: 'No files were uploaded',
    };
    return;
  }

  // Check that the file is a CSV
  const { file } = ctx.request.files;
  if (!file) {
    ctx.status = 400;
    ctx.body = {
      message: 'No file was uploaded',
    };
    return;
  }

  if (file.mimetype !== 'text/csv') {
    ctx.status = 400;
    ctx.body = {
      message: 'File must be a CSV',
    };
    return;
  }

  // Read the CSV file and parse it using neat-csv
  const parsedData = await fs.promises.readFile(file.filepath)
    .then((data) => neatCsv(data, {
      mapHeaders: ({ header }) => header.toLowerCase(),
    }));

  // Check that every header is present
  const requiredHeaders = ['username', 'name', 'email', 'telegram_username', 'role'];
  const missingHeaders = requiredHeaders.filter(
    (header) => !Object.prototype.hasOwnProperty.call(parsedData[0], header),
  );
  if (missingHeaders.length > 0) {
    ctx.status = 400;
    ctx.body = {
      message: `Missing headers: ${missingHeaders.join(', ')}`,
    };
    return;
  }

  // Upsert each member
  const createdMembers = await Promise.all(
    parsedData.map((member) => prisma.member.upsert({
      where: {
        username: member.username,
      },
      create: {
        username: member.username,
        role: member.role,
        profile: {
          create: {
            name: member.name,
            email: member.email,
            telegramUsername: member.telegram_username,
            avatarURL: `https://avatars.githubusercontent.com/${member.username}`,
          },
        },
        joinedAt: new Date(),
      },
      update: {
        role: member.role,
        profile: {
          update: {
            name: member.name,
            email: member.email,
            telegramUsername: member.telegram_username,
            avatarURL: `https://avatars.githubusercontent.com/${member.username}`,
          },
        },
      },
    })),
  );

  ctx.body = createdMembers;
  ctx.status = 201;
  if (parsedData.length > 1) {
    await auditLogger.log('members', 'import', parsedData, ctx.state.user.username);
  } else {
    await auditLogger.log('members', 'create', parsedData[0], ctx.state.user.username);
  }
});
export default router;
