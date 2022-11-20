import React from 'react';

import BadgeCard from './BadgeCard';

function SkillGrid({ achievements, myAchievements = new Set() }) {
  return (
    <div className="flex flex-row flex-wrap gap-10 content-around justify-center my-8 max-w-xl mx-auto">
      {achievements.map((achievement) => (
        <BadgeCard
          key={achievement.id}
          name={achievement.name}
          image={achievement.imageURL}
          hasAchievement={myAchievements.has(achievement.id)}
        />
      ))}
    </div>
  );
}

export default SkillGrid;
