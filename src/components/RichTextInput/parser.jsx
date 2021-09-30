import React from 'react';

const toPreviewNodeDefaultParseItem = ($node) => {
  return <>{$node.textContent}</>;
};

export const fromHtmlToPreviewNode = (
  html,
  parseItemNode = toPreviewNodeDefaultParseItem,
) => {
  const $div = document.createElement('div');
  $div.innerHTML = html || '';
  const $lines = Array.from($div.childNodes);
  const result = $lines.map(($line, lineIndex) => {
    const $items = Array.from($line.childNodes);
    return (
      <div key={lineIndex}>
        {/*空的 div 会导致容器塌陷，这里插一个 br 撑起容器 */}
        {$items.length === 0 && <br />}
        {$items.map(($item, itemIndex) => {
          return (
            <React.Fragment key={`${lineIndex}${itemIndex}`}>
              {parseItemNode($item)}
            </React.Fragment>
          );
        })}
      </div>
    );
  });
  return result;
};

const toTextDefaultParseItem = (node) => {
  return node.textContent || '';
};

export const fromHtmlToText = (
  html,
  parseItemNode = toTextDefaultParseItem,
) => {
  const $div = document.createElement('div');
  $div.innerHTML = html || '';
  const $lines = Array.from($div.childNodes);
  const result = $lines
    .map(($line) => {
      const $items = Array.from($line.childNodes);
      return $items.map(($item) => parseItemNode($item)).join('');
    })
    .join('\n');
  return result;
};

const defaultParseLineTextToHtml = (lineText) => lineText;

export const fromTextToHtml = (
  text,
  parseLineTextToHtml = defaultParseLineTextToHtml,
) => {
  if (!text) {
    return null;
  }
  return text
    .split('\n')
    .map((line) => {
      return `<p>${parseLineTextToHtml(line)}</p>`;
    })
    .join('');
};
