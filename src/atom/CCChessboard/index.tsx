import React from "react";
import WhitePawn from "@/assets/ChessPieces/White-Pawn.svg";
import WhiteRook from "@/assets/ChessPieces/White-Rook.svg";
import WhiteQueen from "@/assets/ChessPieces/White-Queen.svg";
import WhiteKnight from "@/assets/ChessPieces/White-Knight.svg";
import WhiteKing from "@/assets/ChessPieces/White-King.svg";
import WhiteBishop from "@/assets/ChessPieces/White-Bishop.svg";
import BlackPawn from "@/assets/ChessPieces/Black-Pawn.svg";
import BlackRook from "@/assets/ChessPieces/Black-Rook.svg";
import BlackQueen from "@/assets/ChessPieces/Black-Queen.svg";
import BlackKnight from "@/assets/ChessPieces/Black-Knight.svg";
import BlackKing from "@/assets/ChessPieces/Black-King.svg";
import BlackBishop from "@/assets/ChessPieces/Black-Bishop.svg";
import BlackPawnCaptured from "@/assets/ChessPieces/Black-Pawn-Captured.svg";
import BlackBishopCaptured from "@/assets/ChessPieces/Black-Bishop-Captured.svg";
import BlackKnightCaptured from "@/assets/ChessPieces/Black-Knight-Captured.svg";
import BlackRookCaptured from "@/assets/ChessPieces/Black-Rook-Captured.svg";
import BlackKingCaptured from "@/assets/ChessPieces/Black-King-Captured.svg";
import BlackQueenCaptured from "@/assets/ChessPieces/Black-Queen-Captured.svg";
import ChessboardComponent from "chessboard-package";
import Image from "next/image";

export const pieceImages = {
  wP: WhitePawn,
  wR: WhiteRook,
  wQ: WhiteQueen,
  wN: WhiteKnight,
  wK: WhiteKing,
  wB: WhiteBishop,
  bP: BlackPawn,
  bR: BlackRook,
  bQ: BlackQueen,
  bN: BlackKnight,
  bK: BlackKing,
  bB: BlackBishop,
  bPC: BlackPawnCaptured,
  bBC: BlackBishopCaptured,
  bNC: BlackKnightCaptured,
  bRC: BlackRookCaptured,
  bQC: BlackQueenCaptured,
  bKC: BlackKingCaptured,
};

function CCChessboard({ ...rest }) {
  const createPieceTheme = (pieceImages) => {
    return Object.keys(pieceImages).reduce((theme, piece) => {
      theme[piece] = ({ isDragging, squareWidth }) => (
        <Image
          src={pieceImages[piece]}
          alt={piece}
          style={{
            height: squareWidth,
          }}
        />
      );
      return theme;
    }, {});
  };
  const pieceTheme = createPieceTheme(pieceImages);
  return (
    <div>
      <ChessboardComponent customPieces={pieceTheme} {...rest} />
    </div>
  );
}

export default CCChessboard;
