import React from 'react';
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
