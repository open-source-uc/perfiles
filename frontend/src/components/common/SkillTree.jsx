/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react';

import axios from 'axios';

import Tree from 'react-d3-tree';
import UserContext from '../../contexts/userContext';
import LoadingAnimation from './LoadingAnimation';
import handleError from '../../utils/error-handler';

function BadgeCard({ name, image, hasAchievement }) {
  return (
    <article className={`w-[160px] h-[190px] rounded-xl shadow-xl bg-white px-6 flex flex-col justify-center ${hasAchievement ? 'border-indigo-500 border-4' : ''}`}>
      <img className="w-[160px]" src={image} alt={name} />
      <p className="text-gray-800 text-m font-semibold text-center leading-tight">{name}</p>
    </article>
  );
}

function renderBadgeCard({
  nodeSize,
  nodeDatum,
  myAchievements,
  toggleNode,
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
          name={nodeDatum.name}
          image={nodeDatum.imageURL}
          hasAchievement={hasAchievement}
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

export default function SkillTree() {
  const [achievements, setAchievements] = useState({});
  const [myAchievements, setMyAchievements] = useState(new Set());
  const user = React.useContext(UserContext);
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 180, y: 240 };
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    axios.get('/api/public/achievements/progression').then((res) => setAchievements(res.data)).catch((err) => {
      const errorMsg = handleError(err);
      setError(errorMsg);
    });
  }, []);

  useEffect(() => {
    if (user) {
      axios.get('/api/members/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then(
        (res) => {
          setMyAchievements(new Set(res.data.achievements.map((a) => a.achievement.id)));
        },
      ).then(
        () => setLoading(false),
      ).catch(
        (err) => {
          const errorMsg = handleError(err);
          setError(errorMsg);
          setLoading(false);
        },
      );
    }
  }, [user]);

  return (
    <div className="w-[100%] h-[100vh]" ref={containerRef}>
      {loading && !error && <LoadingAnimation />}
      {error && <h2 className="text-center text-2xl font-bold">{error}</h2> }
      {!error && !loading && (
      <Tree
        data={achievements}
        orientation="vertical"
        pathFunc="step"
        pathClassFunc={() => 'linkBase'}
        renderCustomNodeElement={(props) => renderBadgeCard({ ...props, nodeSize, myAchievements })}
        translate={translate}
        nodeSize={nodeSize}
        collapsible
      />
      )}
    </div>
  );
}
