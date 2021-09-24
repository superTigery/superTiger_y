import React from 'react';
import { Node } from '@antv/x6';
import { WomanOutlined } from '@ant-design/icons';
// 链接点
export const ports = {
  groups: {
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 3,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 3,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 3,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 3,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
  },
  items: [
    {
      group: 'top',
    },
    {
      group: 'right',
    },
    {
      group: 'bottom',
    },
    {
      group: 'left',
    },
  ],
};
// 矩形
export const Rect = ({ text, icon }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          borderRadius: 4,
          background: '#ffffff',
          border: '1px solid #e2e6e9',
        }}
      >
        {icon || <WomanOutlined />}
      </div>
      <span
        style={{
          color: '#666666',
          height: '20px',
          lineHeight: '20px',
          display: 'inline-block',
        }}
      >
        {text}
      </span>
    </div>
  );
};
// 圆
export const Circle = ({ text, icon }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: ' #ffffff',
          borderRadius: '50%',
        }}
      >
        {icon || <WomanOutlined />}
      </div>
      <span
        style={{
          color: '#666666',
          height: '20px',
          lineHeight: '20px',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </span>
    </div>
  );
};
// 菱形
export const Rhombus = ({ text, icon }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        gap: 4,
      }}
    >
      <div
        style={{
          width: '34px',
          height: '34px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          background: '#ffffff',
          transform: 'rotate(45deg)',
          marginBottom: '2px',
          border: '1px solid #e2e6e9',
        }}
      >
        {icon || <WomanOutlined />}
      </div>
      <span
        style={{
          color: '#666666',
          height: '20px',
          lineHeight: '20px',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </span>
    </div>
  );
};

// 节点组
export class NodeGroup extends Node {
  constructor() {
    super();
    this.collapsed = false;
  }
  postprocess() {
    this.toggleCollapse(true);
  }

  isCollapsed() {
    return this.collapsed;
  }

  toggleCollapse(collapsed) {
    const target = collapsed ? collapsed : !this.collapsed;
    if (target) {
      this.attr('buttonSign', { d: 'M 1 5 9 5 M 5 1 5 9' });
      this.resize(200, 40);
    } else {
      this.attr('buttonSign', { d: 'M 2 5 8 5' });
      this.resize(240, 240);
    }
    this.collapsed = target;
  }
}

NodeGroup.config({
  shape: 'rect',
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'image',
      selector: 'image',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
    {
      tagName: 'g',
      selector: 'buttonGroup',
      children: [
        {
          tagName: 'rect',
          selector: 'button',
          attrs: {
            'pointer-events': 'visiblePainted',
          },
        },
        {
          tagName: 'path',
          selector: 'buttonSign',
          attrs: {
            fill: 'none',
            'pointer-events': 'none',
          },
        },
      ],
    },
  ],
  attrs: {
    body: {
      refWidth: '100%',
      refHeight: '100%',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)',
      stroke: '#5F95FF',
    },
    image: {
      'xlink:href':
        'https://gw.alipayobjects.com/mdn/rms_0b51a4/afts/img/A*X4e0TrDsEiIAAAAAAAAAAAAAARQnAQ',
      width: 16,
      height: 16,
      x: 8,
      y: 12,
    },
    text: {
      fontSize: 12,
      fill: 'rgba(0,0,0,0.85)',
      refX: 30,
      refY: 15,
    },
    buttonGroup: {
      refX: '100%',
      refX2: -25,
      refY: 13,
    },
    button: {
      height: 14,
      width: 16,
      rx: 2,
      ry: 2,
      fill: '#f5f5f5',
      stroke: '#ccc',
      cursor: 'pointer',
      event: 'node:collapse',
    },
    buttonSign: {
      refX: 3,
      refY: 2,
      stroke: '#808080',
    },
  },
});
