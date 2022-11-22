/* eslint-disable no-unused-vars */
import React from 'react';

import BadgeCard from './BadgeCard';

function SkillGrid({
  achievements, myAchievements = new Set(), isOpen, setIsOpen, setDataBadge,
}) {
  return (
    <div className="flex flex-row flex-wrap gap-10 content-around justify-center my-8 max-w-xl mx-auto">
      {achievements.map((achievement) => (
        <BadgeCard
          key={achievement.id}
          data={achievement}
          hasAchievement={myAchievements.has(achievement.id)}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setDataBadge={setDataBadge}
        />
      ))}
    </div>
  );
}

export default SkillGrid;
