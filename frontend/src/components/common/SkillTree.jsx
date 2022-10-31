import React from 'react';
import Tree from 'react-d3-tree';

const myTreeData = [
  {
    name: 'Gaurang',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Banana.png/836px-Banana.png',
    children: [
      {
        name: 'Avadhoot',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Banana.png/836px-Banana.png',
        children: [
          {
            name: 'Richard',
          },
          {
            name: 'Constantine',
            children: [
              {
                name: 'Mia',
              },
            ],
          },
          {
            name: 'Daniel',
          },
        ],
      },
      {
        name: 'Mia',
      },
      {
        name: 'Varun',
        children: [
          {
            name: 'Ivo',
            children: [
              {
                name: 'Level 2: A',
                children: [
                  {
                    name: 'Level 2: A',
                  },
                  {
                    name: 'Level 2: B',
                  },
                ],
              },
              {
                name: 'Level 2: B',
              },
            ],
          },
          {
            name: 'Vijay',
          },
          {
            name: 'Tijay',
          },
          {
            name: 'Ajsda',
          },
        ],
      },
      {
        name: 'Mohit',
        children: [
          {
            name: 'Rohit',
            children: [
              {
                name: 'Level 2: A',
                children: [
                  {
                    name: 'Level 2: A',
                  },
                  {
                    name: 'Level 2: B',
                  },
                ],
              },
            ],
          },
          {
            name: 'Pranav',
          },
        ],
      },
    ],
  },
];

function NodeLabel({ nodeData }) {
  return (
    <div className="myLabelComponentIncard">
      <img className="chapita" src={nodeData.image} alt=" " />
      <text>{nodeData.name}</text>
    </div>
  );
}

// .attr("stroke", "red");

export default function SkillTree() {
  return (
    <div className="treeWrapper">
      <Tree
          // initialDepth={2}
          // depthFactor={270}
        pathFunc="step"
        orientation="vertical"
        allowForeignObjects
        translate={{ x: 150, y: 100 }} // Donde se visualiza
        separation={{ siblings: 0.6, nonSiblings: 0.7 }}
        nodeSize={{ x: 175, y: 175 }}
        nodeLabelComponent={{
          render: <NodeLabel />,
          foreignObjectWrapper: { x: -50, y: -50 },
        }}
        data={myTreeData}
      />
    </div>
  );
}
