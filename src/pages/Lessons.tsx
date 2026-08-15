import { useState } from 'react';

function Lessons() {
  const [content, setContent] = useState("레슨관리");

  // 버튼을 누를 때 실행될 함수
  const handleClick = () => {
    // 스프링 부트 전체 URL(8080)로 POST 요청을 보냅니다.
    // (만약 Vite 프록시를 설정하셨다면 'http://localhost:8080'을 지우고 '/api/test'로 쓰셔도 됩니다.)
    fetch('/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('네트워크 응답에 문제가 있습니다.');
        }
        return response.text(); // 스프링에서 String을 반환하므로 .text()로 받습니다.
      })
      .then((data) => {
        setContent(data); // 서버에서 받아온 "변경될 내용!!"으로 상태 업데이트
      })
      .catch((error) => {
        console.error('API 호출 에러:', error);
      });
  };

  return (
    <div>
      <h2>{content}</h2>
      {/* 버튼 클릭 시 handleClick 함수 실행 */}
      <button onClick={handleClick}>서버 데이터 가져오기</button>
    </div>
  );
}

export default Lessons;