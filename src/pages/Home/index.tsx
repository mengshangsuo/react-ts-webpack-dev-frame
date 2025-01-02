import { Button, DatePicker, Space } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

const HomePage: React.FC = () => (
  <div>
    <Button type="primary">Button</Button>
    <Space direction="vertical">
      <DatePicker />
    </Space>
    <hr />
    <Outlet />
  </div>
);

export default HomePage;
