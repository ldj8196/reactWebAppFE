import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate 임포트
import loginImage from '../assets/images/loginImage.png';
import '@styles/pages/login.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2. navigate 함수 초기화
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // 로그인 로직 (현재는 더미 로직)
    console.log('로그인 시도:', email, password);

    // 3. 로그인 성공 시 Page1으로 이동
    // 동적 라우팅 규칙상 파일명이 Page1이면 경로는 /page1이 됩니다.
    navigate('/notices');
  };

  return (
    <div className="login-page">
      <div className="login">
        <img src={loginImage} alt="login-image" className="login-image" />
        <div className="form">
          <div className="input-group">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // 엔터키 지원 (선택사항)
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <button className="login-button" onClick={handleLogin}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}