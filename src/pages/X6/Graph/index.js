import React from 'react';
import { Graph, Shape, Addon, FunctionExt } from '@antv/x6';
import '@antv/x6-react-shape';
import { Circle, Rect, ports, Rhombus } from './selfShape';
import graphData from './data';
// import { NodeGroup } from './selfShape';
import './shape';

const action1Style = {
  fontSize: 28,
  color: '#ff9f47',
};

export default class InitGraph {
  static graph = null;
  static stencil = null;
  static init() {
    this.graph = new Graph({
      container: document.getElementById('container'), // 画布容器
      // shift 平移
      panning: {
        enabled: true, // 画布是否可以拖动
        modifiers: 'shift', // 按住shift 可以平移
      },
      grid: true,
      // 网格
      // grid: {
      //   size: 10, // 网格大小 10px
      //   visible: true, // 绘制网格
      //   type: 'doubleMesh', // 网格类型
      //   args: [
      //     {
      //       color: 'rgba(204,204,204,0.2)', // 主网格线颜色
      //       thickness: 1, // 主网格线宽度
      //     },
      //     {
      //       // color: '#5F95FF', // 次网格线颜色
      //       thickness: 1, // 次网格线宽度
      //       factor: 4, // 主次网格线间隔
      //     },
      //   ],
      // },
      // 点选/框选
      selecting: {
        enabled: true,
        // multiple: true, // 启用多选后按住 ctrl 或 command 键点击节点实现多选。
        rubberband: true, // 启用框选
        movable: true, // 选中的节点是否可以被移动
        showNodeSelectionBox: true, // 是否显示节点的选择框，
        filter: ['groupNode'], // 'groupNode' 类型节点不能被选中
      },
      // 配置全局的连线规则
      connecting: {
        anchor: 'center', // 当连接到节点时，通过 anchor 来指定被连接的节点的锚点，默认值为 center。
        connectionPoint: 'anchor', // 指定连接点，默认值为 boundary
        allowBlank: false, // 是否允许连接到画布空白位置的点
        highlight: true, // 拖动边时，是否高亮显示所有可用的连接桩或节点
        snap: true, // 当 snap 设置为 true 时连线的过程中距离节点或者连接桩 50px 时会触发自动吸附
        // 连接的过程中创建新的边
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#5F95FF',
                strokeWidth: 1,
                targetMarker: {
                  name: 'classic',
                  size: 8,
                },
              },
            },
            router: {
              name: 'manhattan',
            },
            zIndex: 0,
          });
        },
        // 在移动边的时候判断连接是否有效
        validateConnection({
          sourceView,
          targetView,
          sourceMagnet,
          targetMagnet,
        }) {
          if (sourceView === targetView) {
            return false;
          }
          if (!sourceMagnet) {
            return false;
          }
          if (!targetMagnet) {
            return false;
          }
          return true;
        },
      },
      // 可以通过 highlighting 选项来指定触发某种交互时的高亮样式
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 14,
            attrs: {
              strokeWidth: 4,
              stroke: 'rgba(223,234,255)',
            },
          },
        },
      },
      snapline: true, // 启动对齐线
      history: true, // 启用撤销/重做
      // 启用剪切板
      clipboard: {
        enabled: true,
      },
      // 启用键盘快捷键
      keyboard: {
        enabled: true,
      },
      // 通过embedding可以将一个节点拖动到另一个节点中，使其成为另一节点的子节点
      embedding: {
        enabled: true,
        findParent({ node }) {
          const bbox = node.getBBox();
          return this.getNodes().filter((node) => {
            // 只有 data.parent 为 true 的节点才是父节点
            const data = node.getData();
            if (data && data.parent) {
              const targetBBox = node.getBBox();
              return bbox.isIntersectWithRect(targetBBox);
            }
            return false;
          });
        },
      },
    });
    this.initStencil();
    this.initGraphShape();
    this.initShape();
    this.initEvent();
    return this.graph;
  }
  // 侧边栏
  static initStencil() {
    this.stencil = new Addon.Stencil({
      target: this.graph,
      title: '',
      stencilGraphWidth: 240,
      search: { rect: true },
      groups: [
        {
          name: 'condition',
          title: '条件控制',
          graphHeight: 160,
          graphWidth: '100%',
        },
        {
          name: 'action',
          title: '动作',
          graphHeight: 160,
          graphWidht: '100%',
          columns: 3,
        },
        {
          name: 'action1',
          title: '动作',
          graphHeight: 200,
          columns: 3,
          marginX: 10,
        },
        {
          name: 'basic',
          title: '基础节点',
          graphHeight: 180,
        },
        {
          name: 'combination',
          title: '组合节点',
          layoutOptions: {
            columns: 1,
            marginX: 60,
          },
          graphHeight: 260,
        },
        {
          name: 'group',
          title: '节点组',
          graphHeight: 100,
          layoutOptions: {
            columns: 1,
            marginX: 60,
          },
        },
      ],
      layoutOptions: {
        columns: 3,
        columnWidth: 80,
        rowHeight: 70,
      },
    });
    const stencilContainer = document.querySelector('#stencil');
    stencilContainer?.appendChild(this.stencil.container);
  }
  // 初始化节点
  static initShape() {
    const { graph } = this;
    const r1 = graph.createNode({
      shape: 'flow-chart-rect',
      attrs: {
        body: {
          rx: 2,
          ry: 2,
        },
        text: {
          textWrap: {
            text: '起始节点',
          },
        },
      },
    });
    const r2 = graph.createNode({
      shape: 'flow-chart-rect',
      attrs: {
        text: {
          textWrap: {
            text: '流程节点',
          },
        },
      },
    });
    const r3 = graph.createNode({
      shape: 'flow-chart-rect',
      width: 36,
      height: 36,
      angle: 45,
      attrs: {
        'edit-text': {
          style: {
            transform: 'rotate(-45deg)',
          },
        },
        text: {
          textWrap: {
            text: '判断节点',
          },
          transform: 'rotate(-45deg)',
        },
      },
      ports: {
        groups: {
          top: {
            position: {
              name: 'top',
              args: {
                dx: -26,
              },
            },
          },
          right: {
            position: {
              name: 'right',
              args: {
                dy: -26,
              },
            },
          },
          bottom: {
            position: {
              name: 'bottom',
              args: {
                dx: 26,
              },
            },
          },
          left: {
            position: {
              name: 'left',
              args: {
                dy: 26,
              },
            },
          },
        },
      },
    });
    const r4 = graph.createNode({
      shape: 'flow-chart-rect',
      width: 70,
      height: 70,
      attrs: {
        body: {
          rx: 35,
          ry: 35,
        },
        text: {
          textWrap: {
            text: '链接节点',
          },
        },
      },
    });

    const c1 = graph.createNode({
      shape: 'flow-chart-image-rect',
    });
    const c2 = graph.createNode({
      shape: 'flow-chart-title-rect',
    });
    const c3 = graph.createNode({
      shape: 'flow-chart-animate-text',
    });

    // const g1 = graph.createNode({
    //   shape: 'groupNode',
    //   attrs: {
    //     text: {
    //       text: 'Group Name',
    //     },
    //   },
    //   data: {
    //     parent: true,
    //   },
    // });

    const weChatTemplate = graph.createNode({
      width: 48,
      height: 68,
      shape: 'react-shape',
      ports: ports,
      component: (
        <Rect
          text="微信消息"
          icon={
            <i
              className="iconfont-ctrl iconWeChat_template_message"
              style={action1Style}
            />
          }
        />
      ),
    });

    const weChatText = graph.createNode({
      width: 48,
      height: 68,
      shape: 'react-shape',
      ports: ports,
      component: (
        <Rect
          text="微信图文"
          icon={
            <i
              className="iconfont-ctrl iconWechat-MS-NF16"
              style={action1Style}
            />
          }
        />
      ),
    });

    const message = graph.createNode({
      width: 48,
      height: 68,
      shape: 'react-shape',
      ports: ports,
      component: (
        <Rect
          text="短信消息"
          icon={
            <i
              className="iconfont-ctrl iconWeChat_graphic_message"
              style={action1Style}
            />
          }
        />
      ),
    });

    const wait = graph.createNode({
      width: 36,
      height: 56,
      shape: 'react-shape',
      ports: ports,
      component: (
        <Circle
          text="等待"
          icon={
            <i className="iconfont-ctrl iconwait" style={{ fontSize: 20 }} />
          }
        />
      ),
    });

    const concat = graph.createNode({
      width: 36,
      height: 56,
      shape: 'react-shape',
      ports: ports,
      component: (
        <Circle
          text="合并"
          icon={
            <i
              className="iconfont-ctrl iconjudgment"
              style={{ fontSize: 20 }}
            />
          }
        />
      ),
    });

    const start = graph.createNode({
      width: 36,
      height: 56,
      shape: 'react-shape',
      ports: ports,
      component: (
        <Circle
          text="结束"
          icon={
            <i className="iconfont-ctrl iconstart" style={{ fontSize: 20 }} />
          }
        />
      ),
    });

    const end = graph.createNode({
      width: 36,
      height: 56,
      shape: 'react-shape',
      ports: ports,
      component: (
        <Circle
          text="结束"
          icon={
            <i className="iconfont-ctrl iconend" style={{ fontSize: 20 }} />
          }
        />
      ),
    });

    const judge = graph.createNode({
      width: 36,
      height: 56,
      shape: 'react-shape',
      ports: ports,
      component: (
        <Rhombus
          text="判断"
          icon={
            <i
              className="iconfont-ctrl iconjudgment"
              style={{
                fontSize: 20,
                color: '#3880ff',
                transform: 'rotate(-45deg)',
              }}
            />
          }
        />
      ),
    });

    const branch = graph.createNode({
      width: 36,
      height: 56,
      shape: 'react-shape',
      ports: ports,
      component: (
        <Rhombus
          text="分支"
          icon={
            <i
              className="iconfont-ctrl iconBranch"
              style={{
                fontSize: 20,
                color: '#3880ff',
                transform: 'rotate(-45deg)',
              }}
            />
          }
        />
      ),
    });

    const filter = graph.createNode({
      width: 36,
      height: 56,
      shape: 'react-shape',
      ports: ports,
      component: (
        <Rhombus
          text="过滤"
          icon={
            <i
              className="iconfont-ctrl iconfilter1"
              style={{
                fontSize: 20,
                color: '#3880ff',
                transform: 'rotate(-45deg)',
              }}
            />
          }
        />
      ),
    });

    const test = graph.createNode({
      width: 36,
      height: 56,
      shape: 'react-shape',
      ports: ports,
      component: (
        <Rhombus
          text="AB测试"
          icon={
            <div
              style={{
                fontSize: 14,
                color: '#3880ff',
                transform: 'rotate(-45deg)',
              }}
            >
              A/B
            </div>
          }
        />
      ),
    });

    this.stencil.load([r1, r2, r3, r4], 'basic');
    this.stencil.load([judge, branch, filter, test], 'condition');
    this.stencil.load([start, wait, concat, end], 'action');
    this.stencil.load([weChatTemplate, weChatText, message], 'action1');
    this.stencil.load([c1, c2, c3], 'combination');
    this.stencil.load([], 'group');
  }
  // 画布数据
  static initGraphShape() {
    this.graph.fromJSON(graphData);
  }
  static showPorts(ports, show) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden';
    }
  }
  // 初始化事件
  static initEvent() {
    const { graph } = this;
    const container = document.getElementById('container');

    const reset = () => {
      graph.drawBackground({ color: '#fff' });
      const nodes = graph.getNodes();
      const edges = graph.getEdges();

      nodes.forEach((node) => {
        node.attr('body/stroke', '#000');
      });

      edges.forEach((edge) => {
        edge.attr('line/stroke', 'black');
        edge.prop('labels/0', {
          attrs: {
            body: {
              stroke: 'black',
            },
          },
        });
      });
    };
    graph.on('node:contextmenu', ({ cell, view }) => {
      const oldText = cell.attr('text/textWrap/text');
      const elem = view.container.querySelector('.x6-edit-text');
      if (elem === null) {
        return;
      }
      cell.attr('text/style/display', 'none');
      if (elem) {
        elem.style.display = '';
        elem.contentEditable = 'true';
        elem.innerText = oldText;
        elem.focus();
      }
      const onBlur = () => {
        cell.attr('text/textWrap/text', elem.innerText);
        cell.attr('text/style/display', '');
        elem.style.display = 'none';
        elem.contentEditable = 'false';
      };
      elem.addEventListener('blur', () => {
        onBlur();
        elem.removeEventListener('blur', onBlur);
      });
    });

    /**
     * 移入移出事件
     */
    graph.on(
      'node:mouseenter',
      FunctionExt.debounce(() => {
        const ports = container.querySelectorAll('.x6-port-body');
        this.showPorts(ports, true);
      }),
      500,
    );
    graph.on('node:mouseleave', () => {
      const ports = container.querySelectorAll('.x6-port-body');
      this.showPorts(ports, false);
    });

    /**
     * 监听折叠事件
     */
    graph.on('node:collapse', ({ node, e }) => {
      e.stopPropagation();
      node.toggleCollapse();
      const collapsed = node.isCollapsed();
      const cells = node.getDescendants();
      cells.forEach((n) => {
        if (collapsed) {
          n.hide();
        } else {
          n.show();
        }
      });
    });

    /**
     * 节点嵌入
     */
    graph.on('node:embedded', ({ cell }) => {
      if (cell.shape !== 'groupNode') {
        cell.toFront();
      }
    });

    /**
     * 绑定键盘backspace键
     */
    graph.bindKey('backspace', () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }
    });
  }
}
