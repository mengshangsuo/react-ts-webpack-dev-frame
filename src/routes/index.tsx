import React, { Suspense } from 'react';
import { createHashRouter, RouteObject } from 'react-router-dom';

// 使用 React.lazy 实现路由懒加载
const MainLayout = React.lazy(() => import('@/layouts/MainLayout'));
const HomePage = React.lazy(() => import('@/pages/Home'));
const HomeChild = React.lazy(() => import('@/pages/Home/Child'));
const AboutPage = React.lazy(() => import('@/pages/About'));
const AboutChild = React.lazy(() => import('@/pages/About/Child'));
const RouterErrorPage = React.lazy(() => import('@/layouts/ErrorPage/RouterErrorPage'));

// 加载中的占位组件
const LoadingFallback = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>加载中...</div>
);

// 包装 Suspense 的高阶组件
const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
};

const RouterConfig: RouteObject[] = [
  {
    path: '/',
    element: withSuspense(MainLayout),
    errorElement: withSuspense(RouterErrorPage),
  },
  {
    path: '/home',
    element: withSuspense(HomePage),
    errorElement: withSuspense(RouterErrorPage),
    children: [
      {
        path: 'home/child',
        element: withSuspense(HomeChild),
      },
    ],
  },
  {
    path: '/about',
    element: withSuspense(AboutPage),
    children: [
      {
        path: 'child',
        element: withSuspense(AboutChild),
      },
    ],
  },
];

const router = createHashRouter(RouterConfig);

export default router;
