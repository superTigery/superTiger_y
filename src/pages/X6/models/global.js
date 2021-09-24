import { useState } from 'react';

export function useGridAttr() {
  const [gridAttrs, setGridAttrs] = useState({
    type: 'mesh',
    size: 10,
    color: '#e5e5e5',
    thickness: 1,
    colorSecond: '#d0d0d0',
    thicknessSecond: 1,
    factor: 4,
    bgColor: 'transparent',
    showImage: true,
    angle: 30,
    position: 'center',
    bgSize: JSON.stringify({ width: 150, height: 150 }),
    opacity: 0.1,
  });
  const setGridAttr = (key, value) => {
    setGridAttrs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return {
    gridAttrs,
    setGridAttr,
  };
}
