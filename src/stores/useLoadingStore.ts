import { create } from 'zustand';

interface LoadingState {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const useLoadingStore = create<LoadingState>((set) => ({
  loading: true, // 초기값 true → 새로고침 시 Splash 표시
  setLoading: (value: boolean) => set({ loading: value }),
}));

export default useLoadingStore;