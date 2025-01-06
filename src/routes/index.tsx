import React from 'react';
import { createHashRouter, RouteObject } from 'react-router-dom';

import AboutPage from '@/pages/About';
import AboutChild from '@/pages/About/Child';

import HomePage from '@/pages/Home';
import HomeChild from '@/pages/Home/Child';
import RouterErrorPage from '@/layouts/ErrorPage/RouterErrorPage';
import MainLayout from '@/layouts/MainLayout';

const RouterConfig: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <RouterErrorPage></RouterErrorPage>,
  },
  {
    path: '/home',
    element: <HomePage></HomePage>,
    errorElement: <RouterErrorPage></RouterErrorPage>,
    children: [
      {
        path: 'home/child',
        element: <HomeChild />,
      },
    ],
  },
  {
    path: '/about',
    element: <AboutPage></AboutPage>,
    children: [
      {
        path: 'child',
        element: <AboutChild />,
      },
    ],
  },
];

const router = createHashRouter(RouterConfig);

export default router;
