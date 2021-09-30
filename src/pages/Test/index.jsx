import React, { useState, useCallback, useEffect } from 'react';
function Parent() {
  const [count, setCount] = useState(1);
  const [val, setVal] = useState('');

  const callback = useCallback(() => {
    return count;
  }, [count]);
  return (
    <div>
      <h1>{count}</h1>
      <Child callback={callback} />
      <div>
        <div>{val}</div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <input value={val} onChange={(event) => setVal(event.target.value)} />
      </div>
    </div>
  );
}

function Child({ callback }) {
  const [count, setCount] = useState(() => callback());
  useEffect(() => {
    setCount(callback());
  }, [callback]);
  return <div>{count}</div>;
}

export default function () {
  return <Parent />;
}
