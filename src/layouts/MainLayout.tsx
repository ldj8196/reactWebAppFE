import React, { useEffect } from 'react';
import { Outlet, useNavigation, useLocation } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import useLoadingStore from '../stores/useLoadingStore';
import useNavStore from '../stores/useNavStore'; // Zustand 스토어 추가
import NavBar from './NavBar';
import Header from './Header';
import '../assets/styles/layout/main-layout.scss';

const MainLayout: React.FC = () => {
  const navigation = useNavigation();
  const location = useLocation();
  const { loading, setLoading } = useLoadingStore();
  
  // 사이드바 상태 가져오기
  const { isOpen, closeNav } = useNavStore();

  useEffect(() => {
    if (navigation.state === 'loading') {
      setLoading(true);
    } else {
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [navigation.state, setLoading]);

  // 페이지 이동 시 스크롤 최상단 및 모바일인 경우 사이드바 닫기
  useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.scrollTop = 0;
    
    // 페이지 이동 시 사이드바 자동으로 닫아주기 (사용성 개선)
    closeNav();
  }, [location.pathname, closeNav]);

  return (
    <div className="main-layout">
      {/* 1. 상단 전체 헤더 */}
      <Header />

      {/* 모바일에서 사이드바 열렸을 때 배경 어둡게 처리 */}
      {isOpen && <div className="nav-overlay" onClick={closeNav}></div>}

      <div className="body-wrapper">
        {/* 2. 사이드바 (데스크탑: 왼쪽 고정 / 모바일: 슬라이딩 드로워) */}
        <NavBar />

        {/* 3. 실제 컨텐츠 영역 */}
        <main className="main-content">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>

      {loading && <LoadingScreen message="Loading..." progress={100} />}
    </div>
  );
};

export default MainLayout;