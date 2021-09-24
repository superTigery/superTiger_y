import React, { useEffect, useState } from 'react';
import ConfigGrid from './ConfigGrid';
import ConfigNode from './ConfigNode';
import ConfigEdge from './ConfigEdge';
import InitGraph from '../../Graph';
import { useGridAttr } from '../../models/global';
import styles from './index.less';

export const CONFIG_TYPE = {
  GRID: 'GRID',
  NODE: 'NODE',
  EDGE: 'EDGE',
};

export default function () {
  const [type, setType] = useState(CONFIG_TYPE.GRID);
  const [id, setId] = useState('');
  const { gridAttrs, setGridAttr } = useGridAttr();

  useEffect(() => {
    const { graph } = InitGraph;
    graph.on('blank:click', () => {
      setType(CONFIG_TYPE.GRID);
    });
    graph.on('cell:click', ({ cell }) => {
      setType(cell.isNode() ? CONFIG_TYPE.NODE : CONFIG_TYPE.EDGE);
      setId(cell.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.config}>
      {type === CONFIG_TYPE.GRID && (
        <ConfigGrid attrs={gridAttrs} setAttr={setGridAttr} />
      )}
      {type === CONFIG_TYPE.NODE && <ConfigNode id={id} />}
      {type === CONFIG_TYPE.EDGE && <ConfigEdge id={id} />}
    </div>
  );
}
