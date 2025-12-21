import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    // setLoading(true)를 비동기 호출로 변경
    const showTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
      if (mounted) setLoading(true);
    }, 0); // 0ms로 비동기 처리

    const hideTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 500); // 실제 로딩 화면 최소 표시 시간

    return () => {
      mounted = false;
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [location.pathname]);

  return loading ? <LoadingScreen /> : <>{children}</>;
};

export default LoadingWrapper;
