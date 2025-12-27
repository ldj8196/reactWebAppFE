import { create } from 'zustand';

export type Tier = '선수' | 'S' | 'A' | 'B' | 'C' | 'D' | '초심'
export type AgeGroup = '10대' | '20대' | '30대' | '40대' | '50대' | '60대+';
export type Position = '일반회원' | '경기이사' | '총무' | '재무' | '회장' | '부회장' | '고문';

export interface Player {
  id: string;
  name: string;
  tier: Tier; // 등급 추가
  ageGroup: AgeGroup; // 나이대 추가
  position: Position; // 직급 필드 추가
}

export interface WaitingGroup {
  id: string;
  players: Player[];
}

export interface Court {
  id: number;
  inGamePlayers: Player[];
  waitingQueue: WaitingGroup[];
}

interface CourtState {
  courts: Court[];
  selectedMembers: Player[]; // 현재 오른쪽 리스트에서 선택된 유저들 (바구니)
  
  // 액션들
  toggleMemberSelection: (player: Player) => void; // 멤버 선택/해제
  addSelectedToCourt: (courtId: number) => void;    // 선택된 멤버를 코트 대기열로
  startMatch: (courtId: number) => void;
  endMatch: (courtId: number) => void;
  removeWaitingGroup: (courtId: number, groupId: string) => void; // 대기 취소 기능
  // 추가된 Getter용 함수: 사용 가능한 멤버만 필터링해서 반환
  getAvailableMembers: (allMembers: Player[]) => Player[];
}

const initialCourts: Court[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  inGamePlayers: [],
  waitingQueue: [],
}));

export const useCourtStore = create<CourtState>((set, get) => ({ // get 추가
  courts: initialCourts,
  selectedMembers: [],

  // 1. Getter 로직 (가장 핵심!)
  getAvailableMembers: (allMembers: Player[]) => {
    const { courts } = get();
    
    // 현재 모든 코트에서 '사용 중'인 유저 ID를 하나의 Set으로 합침
    const busyIds = new Set<string>();
    
    courts.forEach(court => {
      // 경기 중인 인원
      court.inGamePlayers.forEach(p => busyIds.add(p.id));
      // 대기열에 있는 인원
      court.waitingQueue.forEach(group => {
        group.players.forEach(p => busyIds.add(p.id));
      });
    });

    // 전체 명단에서 busyIds에 포함되지 않은 사람만 반환
    return allMembers.filter(member => !busyIds.has(member.id));
  },

  // 2. 멤버 선택 토글
  toggleMemberSelection: (player) => set((state) => {
    const isSelected = state.selectedMembers.some((m) => m.id === player.id);
    if (isSelected) {
      return { selectedMembers: state.selectedMembers.filter((m) => m.id !== player.id) };
    } else {
      if (state.selectedMembers.length >= 4) {
        alert("한 번에 최대 4명까지 선택할 수 있습니다.");
        return state;
      }
      return { selectedMembers: [...state.selectedMembers, player] };
    }
  }),

  // 3. 코트 대기열 추가
  addSelectedToCourt: (courtId) => set((state) => {
    if (state.selectedMembers.length === 0) return state;

    if (state.selectedMembers.length !== 4) {
      alert("경기를 시작하려면 정확히 4명을 선택해야 합니다.");
      return state;
    }
    
    const targetCourt = state.courts.find(c => c.id === courtId);
    if (!targetCourt) return state;

    const currentWaitingCount = targetCourt.waitingQueue.reduce((acc, group) => acc + group.players.length, 0);
    if (currentWaitingCount + state.selectedMembers.length > 4) {
      alert(`대기 인원은 총 4명을 넘을 수 없습니다.`);
      return state;
    }

    return {
      courts: state.courts.map((c) => 
        c.id === courtId 
          ? { ...c, waitingQueue: [...c.waitingQueue, { id: crypto.randomUUID(), players: state.selectedMembers }] } 
          : c
      ),
      selectedMembers: [] 
    };
  }),

  // 4. 경기 시작
  startMatch: (courtId) => set((state) => ({
    courts: state.courts.map((court) => {
      if (court.id !== courtId || court.waitingQueue.length === 0) return court;
      return {
        ...court,
        inGamePlayers: court.waitingQueue.flatMap(group => group.players),
        waitingQueue: []
      };
    })
  })),

  // 5. 경기 종료 (끝나면 자동으로 명단으로 복귀됨)
  endMatch: (courtId) => set((state) => ({
    courts: state.courts.map((court) => 
      court.id === courtId ? { ...court, inGamePlayers: [] } : court
    )
  })),

  // 6. 대기 취소 (취소하면 자동으로 명단으로 복귀됨)
  removeWaitingGroup: (courtId, groupId) => set((state) => ({
    courts: state.courts.map(c => 
      c.id === courtId 
        ? { ...c, waitingQueue: c.waitingQueue.filter(g => g.id !== groupId) }
        : c
    )
  })),
}));