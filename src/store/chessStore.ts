import { create } from "zustand";

interface ChessState {
  fen: string;
  updateFen: (newFen: string) => void;
  resetFen: () => void;
}

const useChessStore = create<ChessState>((set) => ({
  fen: "start", // Initial FEN string
  updateFen: (newFen: string) => set({ fen: newFen }),
  resetFen: () => set({ fen: "start" }),
}));

export default useChessStore;
