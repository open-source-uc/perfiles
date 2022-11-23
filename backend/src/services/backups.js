import Router from '@koa/router';

import dotenv from 'dotenv';
import axios from 'axios';
import auditLogger from '../utils/audit-logger.js';

import prisma from '../client.js';

const router = new Router({ prefix: '/backups' });

dotenv.config();

// This service connects to the the Backups Service API
// it includes two webhooks: /trigger (to trigger a backup and upload it to the API)
// and /restore (to restore from the last backup available in the API)

const { BACKUPS_URL } = process.env;

// Trigger
auditLogger.register(
  'backups',
  'trigger',
  (data, actor) => `El admin ${actor.username} ha solicitado un respaldo.`,
);

router.post('/trigger', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
    };
    return;
  }

  // Dump the AchievementsOnMember table
  const achievementsOnMembers = await prisma.achievementsOnMembers.findMany();

  // Upload the dump
  const { id } = await axios.put(`${BACKUPS_URL}/backups`, achievementsOnMembers);

  ctx.status = 201;
  ctx.body = {
    message: 'Respaldo realizado con éxito',
    id,
  };
  await auditLogger.log('backups', 'trigger', { id }, ctx.state.user.username);
});

// Restore
auditLogger.register(
  'backups',
  'restore',
  (data, actor) => `El admin ${actor.username} ha restaurado desde el último respaldo.`,
);

router.post('/restore', async (ctx) => {
  // Check that the user has a CHAIR or SERVICE role
  if (!(['CHAIR', 'SERVICE'].includes(ctx.state.user.role))) {
    ctx.status = 403;
    ctx.body = {
      message: 'Se requieren privilegios administrativos para acceder a este recurso',
    };
    return;
  }

  // Get the list of available backups
  const backupsResponse = await axios.get(`${BACKUPS_URL}/backups`);
  const backups = backupsResponse.data;

  // Check that there is at least one backup
  if (backups.length === 0) {
    ctx.status = 404;
    ctx.body = {
      message: 'No se encontraron respaldos',
    };
    return;
  }

  // Get the last backup
  const lastBackup = backups[0];

  // Download the last backup
  const backupResponse = await axios.get(`${BACKUPS_URL}/backups/${lastBackup.id}`);
  const backup = backupResponse.data;

  // Delete the current AchievementsOnMember table
  await prisma.achievementsOnMembers.deleteMany();

  // Insert the backup data into the AchievementsOnMember table
  await prisma.achievementsOnMembers.createMany({
    data: backup.blob,
  });

  ctx.status = 201;
  ctx.body = {
    message: 'Restauración realizada con éxito',
  };
  await auditLogger.log('backups', 'restore', { id: lastBackup.id }, ctx.state.user.username);
});

export default router;
