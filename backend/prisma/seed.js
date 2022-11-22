/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function loadMembers() {
  // Open ../../data/members.json
  const members = JSON.parse(fs.readFileSync('data/members.json', 'utf-8'));

  // Load members
  await Promise.all(
    members.map((member) => prisma.member.create({
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
    })),
  );
}

async function loadAchievements() {
  // Open ../../data/achievements.json
  const achievements = JSON.parse(
    fs.readFileSync('data/achievements.json', 'utf-8'),
  );

  // Load achievements
  await Promise.all(
    achievements.map((achievement) => prisma.achievement.create({
      data: {
        name: achievement.name,
        description: achievement.description,
        imageURL: achievement.imageURL,
        type: achievement.type,
        level: {
          connect: {
            name: achievement.level,
          },
        },
        createdAt: new Date(),
        creator: {
          connect: {
            username: achievement.creator,
          },
        },
      },
    })),
  );
}

async function loadAchievementsOnMembers() {
  const achievementsOnMembers = JSON.parse(
    fs.readFileSync('data/achievements_on_members.json', 'utf-8'),
  );

  await Promise.all(
    achievementsOnMembers.map((achievementOnMember) => prisma.achievementsOnMembers.create({
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
    })),
  );
}

async function loadRequests() {
  const requests = JSON.parse(
    fs.readFileSync('data/requests.json', 'utf-8'),
  );

  await Promise.all(requests.map((request) => prisma.request.create({
    data: {
      openedAt: new Date(),
      openedBy: {
        connect: {
          username: request.openedBy,
        },
      },
      state: request.state,
      description: request.description,
      achievement: {
        connect: {
          name: request.achievement,
        },
      },
    },
  })));
}

async function loadAchievementLevels() {
  const levels = JSON.parse(
    fs.readFileSync('data/achievement_levels.json', 'utf-8'),
  );

  await Promise.all(levels.map((level) => prisma.achievementLevel.create({
    data: {
      name: level.name,
      points: level.points,
    },
  })));
}

async function loadAchievementProgressionNodes() {
  const progressionNodes = JSON.parse(
    fs.readFileSync('data/achievement_progression_nodes.json', 'utf-8'),
  );

  // Progression nodes is an object with the root node

  // We need to depth-first traverse the tree and create the nodes
  // Each node only includes a name and its children
  async function createNode(node) {
    const nodeData = {
      achievement: {
        connect: {
          name: node.name,
        },
      },
      children: {
        connect: await Promise.all(node.children.map(createNode)),
      },
    };
    const result = await prisma.achievementProgressionNode.create({
      data: nodeData,
    });

    // Return the id of the created node
    return { id: result.id };
  }

  await createNode(progressionNodes);
}

async function loadProjects() {
  const projects = JSON.parse(
    fs.readFileSync('data/projects.json', 'utf-8'),
  );

  await Promise.all(projects.map((project) => prisma.project.create({
    data: {
      name: project.name,
      description: project.description,
      creator: {
        connect: {
          username: project.creator,
        },
      },
      repo: project.repo,
      access: project.access,
    },
  })));
}

async function loadProjectsOnMembers() {
  const projectsOnMembers = JSON.parse(
    fs.readFileSync('data/projects_on_members.json', 'utf-8'),
  );

  await Promise.all(projectsOnMembers.map((projectOnMember) => prisma.projectsOnMembers.create({
    data: {
      project: {
        connect: {
          name: projectOnMember.project,
        },
      },
      member: {
        connect: {
          username: projectOnMember.member,
        },
      },
    },
  })));
}

async function loadHashtags() {
  const hashtags = JSON.parse(
    fs.readFileSync('data/hashtags.json', 'utf-8'),
  );

  //   await Promise.all([hashtags.map((hashtag) => prisma.hashtag.create({
  //     data: {
  //       name: hashtag.name,
  //     },
  //   })),
  //   hashtags.map((hashtag) => prisma.hashtag.connect({
  //     where: {
  //       name: hashtag.name,
  //     },
  //     data: {
  //       projects: {
  //         connect: hashtag.projects.map((project) => ({ name: project })),
  //       },
  //     },
  //   }))]);
  // }
  await Promise.all(hashtags.map((hashtag) => prisma.hashtag.create({
    data: {
      name: hashtag.name,
      projects: {
        connect: hashtag.projects.map((project) => ({ name: project })),
      },
    },
  })));
}

async function main() {
  await loadMembers();
  await loadAchievementLevels();
  await loadAchievements();
  await loadAchievementsOnMembers();
  await loadRequests();
  await loadAchievementProgressionNodes();
  await loadProjects();
  await loadProjectsOnMembers();
  await loadHashtags();
}

await main();
