import { create } from "zustand";

type Arrow = [string, string, string];
type Square = { square: string; color: string };
interface ChessState {
  fen: string;
  arrows: Arrow[];
  squares: Square[];
  updateFen: (newFen: string) => void;
  updateArrows: (arrows: Arrow[]) => void;
  updateSquares: (squares: Square[]) => void;
  resetFen: () => void;
}

const useChessStore = create<ChessState>((set) => ({
  fen: "start", // Initial FEN string
  arrows: [],
  squares: [],
  updateFen: (newFen: string) => set({ fen: newFen }),
  updateArrows: (arrows: Arrow[]) => set({ arrows: arrows }),
  updateSquares: (squares: Square[]) => set({ squares: squares }),
  resetFen: () => set({ fen: "start" }),
}));

export default useChessStore;
