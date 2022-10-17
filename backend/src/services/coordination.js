import Router from '@koa/router';

import { PrismaClient } from '@prisma/client';

import fs from 'fs';
import getStats from '../utils/stats.js';

const router = new Router({ prefix: '/coord' });
const prisma = new PrismaClient();

export default router;
