import Router from '@koa/router';

import { PrismaClient } from '@prisma/client';

import getStats from '../utils/stats.js';

const router = new Router({ prefix: '/applicants' });
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

  const applicants = await prisma.member.findMany({
    where: {
      role: 'APPLICANT',
    },
    include: {
      profile: true,
      achievements: {
        include: {
          achievement: true,
        },
      },
    },
  });

  ctx.body = applicants;
});

router.get('/report', async (ctx) => {
  // Returns a CSV report of all applicants
  // and their stats
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'You must be an admin to access this resource',
    };
    return;
  }

  const applicants = await prisma.member.findMany({
    where: {
      role: 'APPLICANT',
    },
    include: {
      profile: true,
      achievements: {
        include: {
          achievement: true,
        },
      },
    },
  });

  const report = await Promise.all(applicants.map(async (applicant) => {
    const stats = await getStats(applicant.username);
    return {
      ...applicant.profile,
      ...stats,
    };
  }));

  // Transform the report into a CSV
  const header = Object.keys(report[0]).join(',');
  // Generate the CSV body
  const body = report.map((row) => Object.values(row).join(',')).join('\n');

  ctx.set('Content-Type', 'text/csv');
  ctx.body = `${header}\n${body}`;
});

export default router;