/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react';

import axios from 'axios';

import Tree from 'react-d3-tree';

function BadgeCard({ name, image }) {
  return (
    <article className="w-[160px] h-[190px] rounded-xl shadow-xl bg-white px-6 flex flex-col justify-center">
      <img className="w-[160px]" src={image} alt={name} />
      <p className="text-gray-900 text-m font-semibold text-center leading-tight">{name}</p>
    </article>
  );
}

function renderBadgeCard({
  nodeSize,
  nodeDatum,
}) {
  return (
    <g>
      <foreignObject
        width={nodeSize.x}
        height={nodeSize.y}
        x={-80}
        y={-50}
      >
        <BadgeCard name={nodeDatum.name} image={nodeDatum.imageURL} />
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
  const [data, setData] = useState({});
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 180, y: 240 };

  useEffect(() => {
    axios.get('/api/public/achievements/progression').then((res) => setData(res.data));
  }, []);

  return (
    <div className="w-[100%] h-[100vh]" ref={containerRef}>
      <Tree
        data={data}
        orientation="vertical"
        pathFunc="step"
        pathClassFunc={() => 'linkBase'}
        renderCustomNodeElement={(props) => renderBadgeCard({ ...props, nodeSize })}
        translate={translate}
        nodeSize={nodeSize}
        collapsible
      />
    </div>
  );
}
