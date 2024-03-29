/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';

import Tree from 'react-d3-tree';

import BadgeCard from './BadgeCard';

function renderBadgeCard({
  nodeSize,
  nodeDatum,
  myAchievements,
  toggleNode,
  isOpen,
  setIsOpen,
  setDataBadge,
}) {
  const hasAchievement = myAchievements.has(nodeDatum.achievementId);
  return (
    <g onClick={toggleNode}>
      <foreignObject
        width={nodeSize.x}
        height={nodeSize.y}
        x={-80}
        y={-50}
      >
        <BadgeCard
          data={nodeDatum}
          hasAchievement={hasAchievement}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setDataBadge={setDataBadge}
        />
      </foreignObject>
    </g>
  );
}

function useCenteredTree() {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 8 });
    }
  }, []);
  return [translate, containerRef];
}

export default function SkillTree({
  achievementProgression, myAchievements, isOpen, setIsOpen, setDataBadge,
}) {
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 180, y: 240 };

  return (
    <div className="w-[100%] h-[100vh]" ref={containerRef}>
      <Tree
        data={achievementProgression}
        orientation="vertical"
        pathFunc="step"
        pathClassFunc={() => 'linkBase'}
        renderCustomNodeElement={(props) => renderBadgeCard({
          ...props, nodeSize, myAchievements, isOpen, setIsOpen, setDataBadge,
        })}
        translate={translate}
        nodeSize={nodeSize}
        collapsible
      />
    </div>
  );
}
