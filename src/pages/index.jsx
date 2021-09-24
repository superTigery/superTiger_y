import React, { useEffect } from 'react';
import { history } from 'umi';

export default function IndexPage() {
  useEffect(() => {
    history.replace('/X6');
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: 100 }}>---</h1>
    </div>
  );
}
