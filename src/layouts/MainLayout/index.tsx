import { Menu } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

import './style.less';
import MainHeader from '../Header/MainHeader';
import '../../../node_modules/serve-index/public/style.css';

const MainLayout: React.FC = () => (
  <div className="main-layout-container">
    <div className="main-layout-header">
      <MainHeader></MainHeader>
    </div>
    <div className="main-layout-content">
      <div className="main-layout-content-left">
        <Menu theme="dark" style={{ height: '100%' }} mode="vertical" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </div>
      <div className="main-layout-content-right">
        <Outlet></Outlet>
      </div>
    </div>
  </div>
);

export default MainLayout;
