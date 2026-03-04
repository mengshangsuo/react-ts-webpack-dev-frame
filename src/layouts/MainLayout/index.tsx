import { Menu } from 'antd';
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './style.less';
import MainHeader from '../Header/MainHeader';
import '../../../node_modules/serve-index/public/style.css';

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // 菜单配置
  const menuItems = [
    { key: 'home', labelKey: 'common.menu.home', path: '/home' },
    { key: 'about', labelKey: 'common.menu.about', path: '/about' },
    // 可以根据实际路由配置修改
  ];

  // 根据当前路径确定选中的菜单项
  const getSelectedKey = () => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find(
      item => currentPath === item.path || currentPath.startsWith(item.path),
    );
    return currentItem ? [currentItem.key] : ['home'];
  };

  // 处理菜单点击事件
  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = menuItems.find(item => item.key === key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  return (
    <div className="main-layout-container">
      <div className="main-layout-header">
        <MainHeader></MainHeader>
      </div>
      <div className="main-layout-content">
        <div className="main-layout-content-left">
          <Menu
            theme="dark"
            style={{ height: '100%' }}
            mode="vertical"
            selectedKeys={getSelectedKey()}
            onClick={handleMenuClick}
          >
            {menuItems.map(item => (
              <Menu.Item key={item.key}>{t(item.labelKey)}</Menu.Item>
            ))}
          </Menu>
        </div>
        <div className="main-layout-content-right">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
