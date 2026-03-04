import { Button, DatePicker, Space } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
// import '../../../node_modules/serve-index/public/style.css';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          i18n.changeLanguage('zh');
        }}
        style={{ marginRight: 10 }}
      >
        {t('common.lang.zh')}
      </Button>
      <Button
        type="primary"
        onClick={() => {
          i18n.changeLanguage('en');
        }}
        style={{ marginRight: 10 }}
      >
        {t('common.lang.en')}
      </Button>
      <Space direction="vertical">
        <DatePicker />
      </Space>
      <hr />
      1212121
      <Outlet />
    </div>
  );
};
export default HomePage;
