import { PrismaClient } from '@prisma/client';
import { arrayToTree } from 'performant-array-to-tree';

const prisma = new PrismaClient();

export default async function getProgressionTree() {
  // We'll create a manual recursive query
  const result = await prisma.$queryRaw`
  with recursive tree as
    (
        select id,
            "achievementId",
            "parentId"
        from "AchievementProgressionNode"
        where "parentId" is null
        union all select apn.id,
                            apn."achievementId",
                            apn."parentId"
        from "AchievementProgressionNode" apn
        join tree t on t.id = apn."parentId"
    )
    select *
    from tree;
`;

  // We need to add the achievement data to each node
  const nodes = await Promise.all(result.map(async (node) => {
    const achievement = await prisma.achievement.findUnique({
      where: {
        id: node.achievementId,
      },
    });
    // Remove the achievementId field
    // eslint-disable-next-line no-param-reassign
    delete node.achievementId;
    // Remove id from achievement
    delete achievement.id;
    return {
      ...node,
      ...achievement,
    };
  }));

  // Reconstruction of the tree
  const tree = arrayToTree(nodes, {
    dataField: null,
    throwIfOrphans: true,
  });

  return tree[0];
}
