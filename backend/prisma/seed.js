import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  // Load members
  // Open ../../data/members.json
  const members = JSON.parse(fs.readFileSync('../data/members.json', 'utf-8'));
  // Load members
  members.map(async (member) => {
    await prisma.member.create({
      data: {
        username: member.username,
        name: member.name,
        role: member.role,
        title: member.title ? member.title : null,
        joinedAt: new Date(),
        score: 0,
        level: 0,
        avatarURL: `https://avatars.githubusercontent.com/${member.username}?s=120`,
        // This is a mock email
        email: `${member.username}@uc.cl`,
      },
    });
  });
}

main();
