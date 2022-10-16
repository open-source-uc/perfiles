import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

function loadMembers() {
  // Open ../../data/members.json
  const members = JSON.parse(fs.readFileSync('data/members.json', 'utf-8'));

  // Load members
  members.map(async (member) => {
    await prisma.member.create({
      data: {
        username: member.username,
        role: member.role,
        joinedAt: new Date(),
        profile: {
          create: {
            name: member.name,
            title: member.title,
            telegramUsername: member.telegramUsername,
            email: `${member.username}@uc.cl`,
            avatarURL: `https://avatars.githubusercontent.com/${member.username}?s=120`,
            // This is a mock email
          },
        },
      },
    });
  });
}

function loadAchievements() {
  // Open ../../data/achievements.json
  const achievements = JSON.parse(
    fs.readFileSync('data/achievements.json', 'utf-8'),
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
        creator: {
          connect: {
            username: achievement.creator,
          },
        },
      },
    });
  });
}

function loadAchievementsOnMembers() {
  const achievementsOnMembers = JSON.parse(
    fs.readFileSync('data/achievements_on_members.json', 'utf-8'),
  );

  achievementsOnMembers.map(async (achievementOnMember) => {
    await prisma.achievementsOnMembers.create({
      data: {
        obtainedAt: new Date(),
        awardedBy: {
          connect: {
            username: achievementOnMember.awardedBy,
          },
        },
        member: {
          connect: {
            username: achievementOnMember.member,
          },
        },
        achievement: {
          connect: {
            name: achievementOnMember.achievement,
          },
        },
      },
    });
  });
}

function loadRequests() {
  const requests = JSON.parse(
    fs.readFileSync('data/requests.json', 'utf-8'),
  );

  requests.map(async (request) => {
    await prisma.requests.create({
      data: {
        openedAt: new Date(),
        openedBy: {
          connect: {
            username: request.openedBy,
          },
        },
        state: request.state,
        description: request.description,
      },
    });
  });
}

function loadAchievementLevels() {
  const levels = JSON.parse(
    fs.readFileSync('data/achievement_levels.json', 'utf-8'),
  );

  Object.keys(levels).forEach((key) => {
    // TO AGU: Debe llamarse con await el siguiente create de prisma?
    prisma.achievementLevel.create({
      data: {
        level: key,
        points: levels[key],
      },
  });
}

async function main() {
  loadMembers();
  loadAchievements();
  loadAchievementsOnMembers();
  loadRequests();
}

main();
