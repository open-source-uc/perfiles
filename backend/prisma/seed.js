import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

function loadMembers() {
  // Open ../../data/members.json
  const members = JSON.parse(fs.readFileSync('../data/members.json', 'utf-8'));

  // Load members
  members.map(async (member) => {
    await prisma.member.create({
      data: {
        username: member.username,
        telegramUsername: member.telegramUsername,
        name: member.name,
        role: member.role,
        title: member.title,
        joinedAt: new Date(),
        avatarURL: `https://avatars.githubusercontent.com/${member.username}?s=120`,
        // This is a mock email
        email: `${member.username}@uc.cl`,
      },
    });
  });
}

function loadAchievements() {
  // Open ../../data/achievements.json
  const achievements = JSON.parse(
    fs.readFileSync('../data/achievements.json', 'utf-8'),
  );

  // Load achievements
  achievements.map(async (achievement) => {
    await prisma.achievement.create({
      data: {
        name: achievement.name,
        description: achievement.description,
        imageURL: achievement.imageURL,
        type: achievement.type,
        level: achievement.level,
        createdAt: new Date(),
        creatorUsername: achievement.creatorUsername,
      },
    });
  });
}

async function main() {
  loadMembers();
  loadAchievements();
}

main();
