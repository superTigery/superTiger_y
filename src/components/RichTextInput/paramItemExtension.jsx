/* eslint-disable react/display-name,react/react-in-jsx-scope */
/**
 * [参考](https://braft.margox.cn/demos/entity)
 */
export const paramItemExtension = {
  type: 'entity',
  name: 'PARAM-ITEM',
  data: {
    submitValue: '',
  },
  component: (props) => {
    // 通过entityKey获取entity实例，关于entity实例请参考https://github.com/facebook/draft-js/blob/master/src/model/entity/DraftEntityInstance.js
    const entity = props.contentState.getEntity(props.entityKey);
    // 通过entity.getData()获取该entity的附加数据
    const { submitValue } = entity.getData();
    return (
      <span
        data-submit-value={submitValue}
        className="param-item"
        contentEditable={false}
      >
        {props.children}
      </span>
    );
  },
  importer: (nodeName, node) => {
    if (isParamsItem(nodeName, node)) {
      return {
        mutability: 'IMMUTABLE',
        data: {
          submitValue: node.dataset.submitValue,
        },
      };
    }
  },
  exporter: (entityObject, originalText) => {
    const { submitValue } = entityObject.data;
    return (
      <span data-submit-value={submitValue} className="param-item">
        {originalText}
      </span>
    );
  },
};

export function isParamsItem(nodeName, node) {
  return (
    nodeName.toLowerCase() === 'span' &&
    node.classList &&
    node.classList.contains('param-item')
  );
}

export function getHtmlString(text, value) {
  return `<span class='param-item' data-submit-value='${value}'>${text}</span>`;
}
