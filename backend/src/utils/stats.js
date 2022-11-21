import prisma from '../client.js';

const levels = await prisma.achievementLevel.findMany({
  select: {
    name: true,
    points: true,
  },
});

const POINTS_BY_LEVEL = levels.reduce((acc, level) => {
  acc[level.name] = level.points;
  return acc;
}, {});

function getPoints(achievement) {
  if (achievement.pointsOverride) {
    return achievement.pointsOverride;
  }
  return POINTS_BY_LEVEL[achievement.level.name];
}

async function getStats(username) {
  const achievementsOnMembers = await prisma.achievementsOnMembers.findMany({
    where: {
      memberUsername: username,
    },
    include: {
      achievement: {
        include: {
          level: true,
        },
      },
    },
  });

  const achievements = achievementsOnMembers.map((transaction) => transaction.achievement);

  const points = achievements.reduce((acc, achievement) => {
    const achievementPoints = getPoints(achievement);
    return acc + achievementPoints;
  }, 0);

  const level = points % 100;
  return {
    points,
    level,
  };
}

export default getStats;
