import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LoadingScreen from '../components/LoadingScreen';
import Login from '../pages/Login';

// 1. any 대신 React.ComponentType 또는 React.ComponentType<unknown> 사용
type PageModule = { default: React.ComponentType<unknown> };

const pages = import.meta.glob('../pages/*.tsx') as Record<
  string, 
  () => Promise<PageModule>
>;

// 2. 동적 라우트 생성 (Login 페이지는 제외하고 생성)
const dynamicRoutes: RouteObject[] = Object.entries(pages)
  .map(([filePath, loader]): RouteObject | null => {
    console.log(filePath);
    const fileName = filePath.split('/').pop()?.replace('.tsx', '');
    if (!fileName || fileName === 'Login') return null; // Login.tsx는 동적 생성에서 제외

    // 파일명이 Page1이면 경로는 /page1이 됩니다.
    const routePath = fileName.toLowerCase() === 'home' ? '/' : `/${fileName.toLowerCase()}`;
    const Component = lazy(loader);

    return {
      path: routePath,
      element: (
        <Suspense fallback={<LoadingScreen message="Loading..." progress={100} />}>
          <Component />
        </Suspense>
      ),
    };
  })
  .filter((r): r is RouteObject => r !== null);

// 3. 고정 라우트 (레이아웃이 없는 독립 페이지)
const fixedRoutes: RouteObject[] = [
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingScreen message="Loading Login..." progress={100} />}>
        <Login /> {/* Login 컴포넌트 직접 임포트 혹은 lazy */}
      </Suspense>
    ),
  },
  {
    path: '/',
    element: <Navigate to="/login" replace />, // 초기 진입 시 로그인으로 리다이렉트
  },
];

// 4. 레이아웃 적용 라우트 (나머지 모든 페이지)
const layoutRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: dynamicRoutes, // 위에서 이미 login을 제외했으므로 그대로 사용
  },
];

const router = createBrowserRouter([...fixedRoutes, ...layoutRoutes]);
export default router;