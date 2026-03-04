import React, { useEffect, useState } from 'react';
import { Card, Tag } from 'antd';

const HomeChild: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const Timer = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    return () => clearInterval(Timer);
  }, []);

  return (
    <div className="app">
      <Card title="HomeChild">
        mounted start <Tag color="cyan">count：{count}</Tag> unmounted clear
      </Card>
    </div>
  );
};
export default HomeChild;
