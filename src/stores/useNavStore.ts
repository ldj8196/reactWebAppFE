import { create } from 'zustand';

interface NavState {
  isOpen: boolean;
  toggleNav: () => void;
  closeNav: () => void;
  openNav: () => void;
}

const useNavStore = create<NavState>((set) => ({
  isOpen: false, // 기본값은 닫힘(아이콘만 보임)
  toggleNav: () => set((state) => ({ isOpen: !state.isOpen })),
  closeNav: () => set({ isOpen: false }),
  openNav: () => set({ isOpen: true }),
}));

export default useNavStore;