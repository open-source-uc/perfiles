import Router from '@koa/router';

import auditLogger from '../utils/audit-logger.js';

const router = new Router({ prefix: '/audit' });

router.get('/', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
    };
    return;
  }
  const recentMessages = await auditLogger.getRecentMessages();
  ctx.body = recentMessages;
});

export default router;
