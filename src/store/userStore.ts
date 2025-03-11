import { create } from "zustand";

interface UserState {
  name: string,
  score: number,
  updateScore: (point: number) => void;
  updateName: (name: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  name: "User",
  score: 0,
  updateScore: (point:number) => set((state) => ({ score: state.score+point})),
  updateName: (name: string) => set({ name: name })
}))

export default useUserStore;