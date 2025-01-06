import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import './MainHeaderStyle.less';

const MainHeader: React.FC = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  function changeLanguage(lang: string) {
    i18n.changeLanguage(lang);
  }
  return (
    <div className="main-header-container">
      <Button
        type="primary"
        onClick={() => {
          changeLanguage('zh');
        }}
        style={{ marginRight: 10 }}
      >
        {t('common.lang.zh')}
      </Button>
      <Button
        type="primary"
        onClick={() => {
          changeLanguage('en');
        }}
        style={{ marginRight: 10 }}
      >
        {t('common.lang.en')}
      </Button>
    </div>
  );
};

export default MainHeader;
