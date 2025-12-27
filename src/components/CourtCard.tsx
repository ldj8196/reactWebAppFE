import '@styles/components/courtcard.scss'; 
import { useCourtStore } from '../stores/useCourtStore';
import type { Court } from '../stores/useCourtStore';
import PlayerSmallCard from './PlayerSmallCard';

interface Props { 
  court: Court;
  isDisabled?: boolean; // 비활성화 여부 추가
}

const CourtCard = ({ court, isDisabled = false }: Props) => {
  const { addSelectedToCourt, startMatch, endMatch, selectedMembers, removeWaitingGroup } = useCourtStore();
  const waitCount = court.waitingQueue.reduce((acc, g) => acc + g.players.length, 0);

  return (
    <div className={`court-card ${isDisabled ? 'disabled' : ''}`}>
      <div className="court-header">
        <div className="title-area">
          <h4>코트 {court.id} {isDisabled && <span className="closed-text">(미운영)</span>}</h4>
          {court.inGamePlayers.length > 0 && !isDisabled && <span className="status-badge">경기중</span>}
        </div>
        
        {/* 비활성화 상태가 아닐 때만 경기 종료/시작 버튼 노출 */}
        {!isDisabled && (
          court.inGamePlayers.length > 0 ? (
            <button className="btn-end" onClick={() => endMatch(court.id)}>경기 종료</button>
          ) : (
            <button 
              className="btn-start" 
              onClick={() => startMatch(court.id)} 
              disabled={court.waitingQueue.length === 0}
            >
              시작
            </button>
          )
        )}
      </div>

      {/* 1. 현재 경기 중인 플레이어 */}
      <div className="ingame-grid">
        {[0, 1, 2, 3].map(i => {
          const player = court.inGamePlayers[i];
          return (
            <div key={i} className={`player-slot ${player ? 'filled' : ''}`}>
              {player && !isDisabled ? (
                <PlayerSmallCard player={player} size="sm" />
              ) : (
                <div className="empty-slot">
                  <span className="slot-num">{i + 1}</span>
                  <span className="empty-text">{isDisabled ? "-" : "비어있음"}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 2. 대기열 섹션 */}
      <div className="waiting-section">
        <div className="wait-header">
          <span>대기 현황 <strong>{isDisabled ? 0 : waitCount}</strong>/4</span>
          <button 
            className="add-wait-btn"
            onClick={() => addSelectedToCourt(court.id)}
            // 코트가 비활성화되면 버튼도 disabled
            disabled={isDisabled || selectedMembers.length === 0}
          >
            + 대기추가
          </button>
        </div>
        
        <div className="wait-list">
          {!isDisabled && court.waitingQueue.length > 0 ? (
            court.waitingQueue.map(group => (
              <div key={group.id} className="wait-group-item">
                <div className="group-players">
                  {group.players.map(player => (
                    <PlayerSmallCard key={player.id} player={player} size="sm" />
                  ))}
                </div>
                <button 
                  className="delete-group-btn" 
                  onClick={() => removeWaitingGroup(court.id, group.id)}
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <div className="empty-wait">
              {isDisabled ? "사용할 수 없는 코트입니다." : "대기 중인 팀이 없습니다."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourtCard;