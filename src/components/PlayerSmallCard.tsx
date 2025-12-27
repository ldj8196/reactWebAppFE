import { type Player } from '../stores/useCourtStore';
import '../assets/styles/components/playercard.scss';

interface PlayerSmallCardProps {
  player: Player;
  size?: 'sm' | 'md'; // sm: 코트 내부용, md: 리스트용
  isSelected?: boolean;
}

const PlayerSmallCard = ({ player, size = 'md', isSelected = false }: PlayerSmallCardProps) => {
  return (
    <div className={`player-small-card ${size} ${isSelected ? 'active' : ''}`}>
      {/* 등급 색상이 적용된 아바타 */}
      <div className={`avatar tier-${player.tier}`}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="12" cy="14" r="8" />
          <circle cx="12" cy="15" r="1.5" fill="rgba(0,0,0,0.15)" /> 
        </svg>
      </div>
      
      <div className="player-info">
        <div className="name-row">
          <span className="name">{player.name}</span>
          <span className={`pos-badge pos-${player.position}`}>
            {player.position}
          </span>
          {size === 'md' && <span className="age-tag">{player.ageGroup}</span>}
        </div>
        {size === 'md' && <span className="tier-text">{player.tier} 등급</span>}
      </div>

      {isSelected && <span className="check-icon">✓</span>}
    </div>
  );
};

export default PlayerSmallCard;