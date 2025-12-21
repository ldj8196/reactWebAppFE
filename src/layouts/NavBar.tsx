import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Orbit, 
  Megaphone, 
  UserCog, 
  GraduationCap, 
  Menu,
  ChevronLeft
} from 'lucide-react';
import useNavStore from '../stores/useNavStore'; // 스토어 경로 확인
import '@styles/layout/navbar.scss';

export default function NavBar() {
  const location = useLocation();
  const { isOpen, toggleNav } = useNavStore(); // Zustand 상태 가져오기

  const menuItems = [
    { name: '공지사항', path: '/notices', icon: <Megaphone size={24} /> },
    { name: '일정', path: '/calendar', icon: <Calendar size={24} /> },
    { name: '코트 관리', path: '/courts', icon: <Orbit size={24} /> },
    { name: '레슨 신청', path: '/lessons', icon: <GraduationCap size={24} /> },
    { name: '회원 관리', path: '/admin/users', icon: <UserCog size={24} /> },
  ];

  return (
    <nav className={`nav-bar ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="nav-container">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link 
                to={item.path} 
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <div className="icon-wrapper">{item.icon}</div>
                <span className="nav-text">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-footer">
          <button className="more-btn" onClick={toggleNav}>
            <div className="icon-wrapper">
              {/* 열려있을 때는 왼쪽 화살표, 닫혀있을 때는 메뉴 아이콘 */}
              {isOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
            </div>
            <span className="nav-text">접기</span>
          </button>
        </div>
      </div>
    </nav>
  );
}