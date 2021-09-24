import React, { useEffect, useState, useRef } from 'react';
import { Tabs, Row, Col, Input, Slider, Select } from 'antd';
import InitGraph from '../../../Graph';
import { Cell, Edge } from '@antv/x6';

const { TabPane } = Tabs;

export default function (props) {
  const { id } = props;
  const [attrs, setAttrs] = useState({
    stroke: '#5F95FF',
    strokeWidth: 1,
    connector: 'normal',
  });
  const cellRef = useRef();

  useEffect(() => {
    if (id) {
      const { graph } = InitGraph;
      const cell = graph.getCellById(id);
      if (!cell || !cell.isEdge()) {
        return;
      }
      cellRef.current = cell;

      const connector = cell.getConnector() || {
        name: 'normal',
      };
      setAttr('stroke', cell.attr('line/stroke'));
      setAttr('strokeWidth', cell.attr('line/strokeWidth'));
      setAttr('connector', connector.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const setAttr = (key, val) => {
    setAttrs((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const onStrokeChange = (e) => {
    const val = e.target.value;
    setAttr('stroke', val);
    cellRef.current.attr('line/stroke', val);
  };

  const onStrokeWidthChange = (val) => {
    setAttr('strokeWidth', val);
    cellRef.current.attr('line/strokeWidth', val);
  };

  const onConnectorChange = (val) => {
    setAttr('connector', val);
    const cell = cellRef.current;
    cell.setConnector(val);
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="线条" key="1">
        <Row align="middle">
          <Col span={8}>Width</Col>
          <Col span={12}>
            <Slider
              min={1}
              max={5}
              step={1}
              value={attrs.strokeWidth}
              onChange={onStrokeWidthChange}
            />
          </Col>
          <Col span={2}>
            <div className="result">{attrs.strokeWidth}</div>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>Color</Col>
          <Col span={14}>
            <Input
              type="color"
              value={attrs.stroke}
              style={{ width: '100%' }}
              onChange={onStrokeChange}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>Connector</Col>
          <Col span={14}>
            <Select
              style={{ width: '100%' }}
              value={attrs.connector}
              onChange={onConnectorChange}
            >
              <Select.Option value="normal">Normal</Select.Option>
              <Select.Option value="smooth">Smooth</Select.Option>
              <Select.Option value="rounded">Rounded</Select.Option>
              <Select.Option value="jumpover">Jumpover</Select.Option>
            </Select>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  );
}
