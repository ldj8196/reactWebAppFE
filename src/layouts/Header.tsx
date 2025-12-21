import { Menu, Bell } from 'lucide-react'; // 아이콘 라이브러리 활용
import useNavStore from '../stores/useNavStore'; // 스토어 경로 확인 필요
import '../assets/styles/layout/header.scss';

export default function Header() {
  // Zustand에서 사이드바 토글 함수 가져오기
  const { toggleNav } = useNavStore();

  return (
    <header className="header-bar">
      <div className="header-container">
        {/* 왼쪽: 메뉴 토글 버튼 + 로고 */}
        <div className="left-section">
          <button 
            className="nav-toggle-btn" 
            onClick={toggleNav} 
            aria-label="Toggle Navigation"
          >
            <Menu size={24} />
          </button>
          
          <div className="logo-area">
            {/* 배드민턴 클럽 느낌으로 타이틀 수정 */}
            <h2>최강<span>명천</span></h2>
          </div>
        </div>

        {/* 오른쪽: 사용자 정보 및 액션 */}
        <div className="user-area">
          <button className="notification-btn" aria-label="notifications">
            <Bell size={22} />
            <span className="dot"></span>
          </button>
          
          <div className="user-profile">
            <div className="avatar-wrapper">
              <div className="avatar">AD</div> {/* Admin의 약자 예시 */}
            </div>
            <span className="user-name">관리자님</span>
          </div>
        </div>
      </div>
    </header>
  );
}