import { useState, useMemo } from 'react';
import '@styles/components/memberlist.scss';
import { useCourtStore } from '../stores/useCourtStore';
import type { Player } from '../stores/useCourtStore';
import PlayerSmallCard from './PlayerSmallCard';

// 전체 회원 데이터 (DB 대용)
const ALL_MEMBERS: Player[] = [
  { id: 'm1', name: '신영주', tier: 'S', ageGroup: '40대', position: '회장' },
  { id: 'm2', name: '조애희', tier: 'S', ageGroup: '40대', position: '총무' },
  { id: 'm3', name: '조백두', tier: 'A', ageGroup: '20대', position: '경기이사' },
  { id: 'm4', name: '이정은', tier: 'A', ageGroup: '40대', position: '부회장' },
  { id: 'm5', name: '옥수진', tier: 'A', ageGroup: '40대', position: '재무' },
  { id: 'm6', name: '이기제', tier: 'A', ageGroup: '40대', position: '부회장' },
  { id: 'm7', name: '김병수', tier: 'A', ageGroup: '50대', position: '고문' },
  { id: 'm8', name: '채수건', tier: 'S', ageGroup: '40대', position: '부회장' },
  { id: 'm9', name: '황득규', tier: '초심', ageGroup: '40대', position: '일반회원' },
  { id: 'm10', name: '강명화', tier: 'A', ageGroup: '50대', position: '일반회원' },
  { id: 'm11', name: '강상묵', tier: 'S', ageGroup: '40대', position: '일반회원' },
  { id: 'm12', name: '강현', tier: 'D', ageGroup: '30대', position: '일반회원' },
  { id: 'm13', name: '김건우', tier: 'A', ageGroup: '40대', position: '일반회원' },
  { id: 'm14', name: '강현득', tier: 'A', ageGroup: '40대', position: '일반회원' },
  { id: 'm15', name: '김경훈', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm16', name: '김광태', tier: 'A', ageGroup: '40대', position: '일반회원' },
  { id: 'm17', name: '김만재', tier: 'C', ageGroup: '30대', position: '일반회원' },
  { id: 'm18', name: '김소정', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm19', name: '김수빈', tier: 'B', ageGroup: '20대', position: '일반회원' },
  { id: 'm20', name: '김영순', tier: 'A', ageGroup: '40대', position: '일반회원' },
  { id: 'm21', name: '김우진', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm22', name: '김은비', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm23', name: '김정희', tier: 'C', ageGroup: '50대', position: '일반회원' },
  { id: 'm24', name: '김지훈', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm25', name: '김진영', tier: '선수', ageGroup: '30대', position: '일반회원' },
  { id: 'm26', name: '김진형', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm27', name: '김태경', tier: 'D', ageGroup: '20대', position: '일반회원' },
  { id: 'm28', name: '김현승', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm29', name: '김혜리', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm30', name: '김효은', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm31', name: '남소영', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm32', name: '노유환', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm33', name: '김태성', tier: 'A', ageGroup: '40대', position: '일반회원' },
  { id: 'm34', name: '최유석', tier: 'D', ageGroup: '10대', position: '일반회원' },
  { id: 'm35', name: '박은총', tier: 'S', ageGroup: '40대', position: '일반회원' },
  { id: 'm36', name: '박지민', tier: 'D', ageGroup: '20대', position: '일반회원' },
  { id: 'm37', name: '박찬수', tier: 'S', ageGroup: '40대', position: '일반회원' },
  { id: 'm38', name: '박홍준', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm39', name: '사하영', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm40', name: '석광민', tier: 'C', ageGroup: '40대', position: '일반회원' },
  { id: 'm41', name: '성지혜', tier: 'A', ageGroup: '40대', position: '일반회원' },
  { id: 'm42', name: '손양미', tier: 'S', ageGroup: '40대', position: '일반회원' },
  { id: 'm43', name: '신기택', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm44', name: '양형원', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm45', name: '엄예빈', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm46', name: '오유성', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm47', name: '오준택', tier: 'C', ageGroup: '20대', position: '일반회원' },
  { id: 'm48', name: '오태곤', tier: 'D', ageGroup: '20대', position: '일반회원' },
  { id: 'm49', name: '유동근', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm50', name: '유명환', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm51', name: '유석규', tier: 'A', ageGroup: '30대', position: '일반회원' },
  { id: 'm52', name: '이동철', tier: 'A', ageGroup: '50대', position: '일반회원' },
  { id: 'm53', name: '이민진', tier: 'A', ageGroup: '40대', position: '일반회원' },
  { id: 'm54', name: '이상호', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm55', name: '이선희', tier: '초심', ageGroup: '50대', position: '일반회원' },
  { id: 'm56', name: '이시정', tier: 'S', ageGroup: '40대', position: '일반회원' },
  { id: 'm57', name: '이예원', tier: 'D', ageGroup: '20대', position: '일반회원' },
  { id: 'm58', name: '이재구', tier: 'S', ageGroup: '40대', position: '일반회원' },
  { id: 'm59', name: '이창걸', tier: 'D', ageGroup: '30대', position: '일반회원' },
  { id: 'm60', name: '이철효', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm61', name: '이희춘', tier: 'A', ageGroup: '40대', position: '일반회원' },
  { id: 'm62', name: '임현', tier: 'B', ageGroup: '40대', position: '일반회원' },
  { id: 'm63', name: '임현자', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm64', name: '장민우', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm65', name: '장아영', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm66', name: '장윤경', tier: 'B', ageGroup: '40대', position: '일반회원' },
  { id: 'm67', name: '장호재', tier: 'A', ageGroup: '40대', position: '일반회원' },
  { id: 'm68', name: '정순영', tier: 'A', ageGroup: '40대', position: '일반회원' },
  { id: 'm69', name: '조영구', tier: '초심', ageGroup: '40대', position: '일반회원' },
  { id: 'm70', name: '조용진', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm71', name: '조재혁', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm72', name: '조준현', tier: 'C', ageGroup: '40대', position: '일반회원' },
  { id: 'm73', name: '주상필', tier: 'A', ageGroup: '40대', position: '일반회원' },
  { id: 'm74', name: '차영석', tier: 'B', ageGroup: '30대', position: '일반회원' },
  { id: 'm75', name: '최서우', tier: '초심', ageGroup: '40대', position: '일반회원' },
  { id: 'm76', name: '최영동', tier: 'C', ageGroup: '40대', position: '일반회원' },
  { id: 'm77', name: '최은경', tier: 'A', ageGroup: '40대', position: '일반회원' },
  { id: 'm78', name: '최일우', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm79', name: '최정민', tier: 'B', ageGroup: '20대', position: '일반회원' },
  { id: 'm80', name: '태정한', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm81', name: '한현성', tier: 'A', ageGroup: '40대', position: '일반회원' },
  { id: 'm82', name: '함성태', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm83', name: '황승민', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm84', name: '황영주', tier: '초심', ageGroup: '30대', position: '일반회원' },
  { id: 'm85', name: '이동준', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm86', name: '꿈나무1', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm87', name: '꿈나무2', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm88', name: '꿈나무3', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm89', name: '꿈나무4', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm90', name: '꿈나무5', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm91', name: '꿈나무6', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm92', name: '꿈나무7', tier: '초심', ageGroup: '20대', position: '일반회원' },
  { id: 'm93', name: '꿈나무8', tier: '초심', ageGroup: '20대', position: '일반회원' },
];

const MemberList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // courts 상태를 직접 가져와서 useMemo의 의존성 배열에 넣습니다.
  const { courts, selectedMembers, toggleMemberSelection, getAvailableMembers } = useCourtStore();

  /**
   * [최적화] useMemo 사용
   * 코트의 상황(경기중, 대기중)이 변할 때만 사용 가능한 인원을 새로 계산합니다.
   * 단순히 검색어를 입력할 때는 이 계산을 건너뜁니다.
   */
  const availableMembers = useMemo(() => {
    return getAvailableMembers(ALL_MEMBERS);
  }, [courts, getAvailableMembers]); 

  // 검색어 필터링 (사용자가 타이핑할 때마다 실행)
  const filteredMembers = availableMembers.filter(member =>
    member.name.includes(searchTerm)
  );

  return (
    <div className="member-list-container">
      {/* 1. 검색 영역 */}
      <div className="search-box">
        <input
          type="text"
          placeholder="회원 이름 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className="clear-btn" onClick={() => setSearchTerm('')}>×</button>
        )}
      </div>

      {/* 2. 요약 정보바 */}
      <div className="info-bar">
        <span>
          대기 가능: <strong>{availableMembers.length}</strong>명 | 
          선택됨: <strong>{selectedMembers.length}</strong> / 4
        </span>
      </div>

      {/* 3. 스크롤 리스트 영역 */}
      <div className="member-scroll-area">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <div 
              key={member.id} 
              className="member-item-wrapper"
              onClick={() => toggleMemberSelection(member)}
            >
              <PlayerSmallCard 
                player={member} 
                size="md" 
                // 바구니에 담긴 상태인지 확인
                isSelected={selectedMembers.some((m) => m.id === member.id)} 
              />
            </div>
          ))
        ) : (
          <div className="no-result">
            {searchTerm 
              ? `"${searchTerm}"에 대한 검색 결과가 없습니다.` 
              : "현재 선택 가능한 회원이 없습니다."}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberList;