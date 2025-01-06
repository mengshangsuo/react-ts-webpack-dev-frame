import React, { useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
import { ConfigProvider } from 'antd';
import {
  RouterProvider,
} from "react-router-dom";
import router from './routes';

// 引入国际化配置
import  './i18n/langConfig';

import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
// import 'antd/dist/antd.css';
import 'antd/dist/antd.less'
moment.locale('zh-cn');


// 动态换肤
// ConfigProvider.config({
//   theme: {
//     primaryColor: 'red',
//   },
// });

function App() {
  return (
    <React.StrictMode>
        <ConfigProvider locale={zhCN}>
          <RouterProvider router={router}></RouterProvider>
        </ConfigProvider>
    </React.StrictMode>
  );
}

export default App;
