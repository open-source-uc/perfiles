/* eslint-disable no-return-assign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/state-in-constructor */
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

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}) => (
  <g onClick={toggleNode}>
    <foreignObject {...foreignObjectProps}>
      <div className="myLabelComponentIncard">
        <img className="chapita" src={nodeDatum.image} alt=" " />
        <div>
          {nodeDatum.name}
        </div>
      </div>
    </foreignObject>
  </g>
);

const nodeSize = { x: 150, y: 150 };
const foreignObjectProps = {
  width: nodeSize.x,
  height: nodeSize.y - 40,
  x: -50,
  y: -50,
};

export default class SkillTree extends React.PureComponent {
  state = {};

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: 70,
      },
      data: myTreeData,
      depth: 2,
    });
  }

  render() {
    return (
      <div className="treeWrapper" ref={(tc) => (this.treeContainer = tc)}>
        {this.state.data && (
          <Tree
            shouldCollapseNeighborNodes
            orientation="vertical"
            pathFunc="step"
            data={this.state.data}
            translate={this.state.translate} // Donde se visualiza
            initialDepth={this.state.depth}
            onNodeClick={this.onNodeClick}
            separation={{ siblings: 0.6, nonSiblings: 0.7 }}
            nodeSize={{ x: 175, y: 175 }}
            // Generamos los nodos del arbol
            renderCustomNodeElement={(rd3tProps) => renderForeignObjectNode(
              { ...rd3tProps, foreignObjectProps },
            )}
            zoom={0.7}
            // Pasamos los Estilos (No todos estan implementados, pero se deja como base)
            pathClassFunc={() => 'linkBase'}
            rootNodeClassName="rootNode"
            branchNodeClassName="branchNode"
            leafNodeClassName="leafNode"
          />
        )}
      </div>
    );
  }
}
