import '@styles/pages/courts.scss'; // 일반 SCSS 임포트 (경로는 프로젝트 설정에 맞게 조절하세요)
import CourtCard from '../components/CourtCard';
import MemberList from '../components/MemberList';
import { useCourtStore } from '../stores/useCourtStore';
// 컴포넌트 외부나 내부에 선언
const CLOSED_COURTS = [4, 6];

const Court = () => {
  const courts = useCourtStore((state) => state.courts);

  return (
    // className={styles.container} 대신 직접 문자열 클래스명 사용
    <div className="court-page-container">
      {/* 왼쪽 코트 섹션 */}
      <section className="court-section">
        <div className="court-grid">
          {courts.map((court) => (
            <CourtCard 
              key={court.id} 
              court={court} // 4번, 6번 코트일 때 true를 전달
              isDisabled={CLOSED_COURTS.includes(court.id)} 
            />
          ))}
        </div>
      </section>

      {/* 오른쪽 회원 리스트 섹션 */}
      <section className="member-section">
        <div className="member-header" style={{ padding: '12px 16px' }}> {/* 패딩 축소 */}
          <h2 style={{ fontSize: '1rem' }}>회원 명단</h2>
        </div>
        <MemberList />
      </section>
    </div>
  );
};

export default Court;