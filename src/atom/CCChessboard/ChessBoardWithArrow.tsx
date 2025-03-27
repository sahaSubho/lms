/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from "react";
//@ts-ignore
import Chessboard from "chessboard-package";

type ChessboardWithArrowProps = {
  boardOrientation?: "white" | "black";
  customPieces: unknown;
  arrowsToShow?: Arrow[];
  higlightedSquares?: Square[];
  disabled?: boolean;
};

type Arrow = [string, string, string];
type Square = { square: string; color: string };


type ChessboardWithArrowHandle = {
  resetArrows: () => void;
  board: HTMLDivElement | null;
  chessboard: unknown;
};

const ChessboardWithArrow: ForwardRefRenderFunction<
  ChessboardWithArrowHandle,
  ChessboardWithArrowProps
> = (
  { boardOrientation = "white", arrowsToShow = [],higlightedSquares = [], disabled, ...rest },
  ref
) => {
  console.log("higlightedSquares", higlightedSquares)
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [markedSquares, setMarkedSquares] = useState<
    { square: string; color: string }[]
  >([]);
  const [currentArrow, setCurrentArrow] = useState<Arrow | null>(null);
  const [dragStartSquare, setDragStartSquare] = useState<string | null>(null);
  const [boardWidth, setBoardWidth] = useState<number>(0);

  const boardRef = useRef<HTMLDivElement | null>(null);
  const chessboardRef = useRef<unknown>(null);

  const colorOptions = {
    default: "#3DAB9E",
    shiftFn: "#EB5757",
    optionCmd: "#67B3E1",
  };

  const resetChessboardArrows = () => {
    if (arrowsToShow.length === 0) {
      setArrows([]);
    }
    if(higlightedSquares.length === 0){
      setMarkedSquares([]);
    }
    setDragStartSquare(null);
    setCurrentArrow(null);
  };

  useImperativeHandle(ref, () => ({
    resetArrows: resetChessboardArrows,
    board: boardRef.current,
    chessboard: chessboardRef.current,
    //@ts-ignore
    clearPremoves: () => chessboardRef.current?.clearPremoves?.(),
  }));

  const getArrowColor = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.ctrlKey || event.metaKey) return colorOptions.optionCmd;
    else if (event.shiftKey) return colorOptions.shiftFn;
    else if (event.altKey) return colorOptions.shiftFn;
    return colorOptions.default;
  };

  const flipSquare = (square: string) => {
    if (boardOrientation === "white") return square;
    const file = square.charCodeAt(0);
    const rank = parseInt(square[1], 10);
    const flippedFile = String.fromCharCode(104 - (file - 97));
    const flippedRank = 9 - rank;
    return `${flippedFile}${flippedRank}`;
  };

  const getSquarePosition = (square: string) => {
    const flippedSquare = flipSquare(square);
    const file = flippedSquare?.charCodeAt(0) - 97;
    const rank = 8 - parseInt(flippedSquare[1], 10);
    return { x: file * (boardWidth / 8), y: rank * (boardWidth / 8) };
  };

  const getSquareFromEvent = (
    event: React.MouseEvent<HTMLDivElement>,
    boardRect: DOMRect
  ) => {
    const { clientX, clientY } = event;
    const squareSize = boardRect.width / 8;
    const x = Math.floor((clientX - boardRect.left) / squareSize);
    const y = Math.floor((clientY - boardRect.top) / squareSize);
    const file = String.fromCharCode(97 + x);
    const rank = 8 - y;
    const square = `${file}${rank}`;
    return flipSquare(square);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button === 0) {
      resetChessboardArrows();
    } else if (event.button === 2) {
      event.preventDefault();
      const boardElement = boardRef.current;
      if (boardElement) {
        const boardRect = boardElement.getBoundingClientRect();
        const startSquare = getSquareFromEvent(event, boardRect);
        const color = getArrowColor(event);
        setDragStartSquare(startSquare);
        setCurrentArrow([startSquare, startSquare, color]);
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartSquare) {
      const boardElement = boardRef.current;
      if (boardElement) {
        const boardRect = boardElement.getBoundingClientRect();
        const currentSquare = getSquareFromEvent(event, boardRect);
        const color = currentArrow ? currentArrow[2] : colorOptions.default;
        setCurrentArrow([dragStartSquare, currentSquare, color]);
      }
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button === 2 && dragStartSquare) {
      event.preventDefault();
      const boardElement = boardRef.current;
      if (boardElement) {
        const boardRect = boardElement.getBoundingClientRect();
        const endSquare = getSquareFromEvent(event, boardRect);
        const color = currentArrow ? currentArrow[2] : colorOptions.default;

        if (dragStartSquare === endSquare) {
          setMarkedSquares((prev) =>
            prev.some((mark) => mark.square === endSquare)
              ? prev.filter((mark) => mark.square !== endSquare)
              : [...prev, { square: endSquare, color }]
          );
        } else {
          const newArrow: Arrow = [dragStartSquare, endSquare, color];
          setArrows((prevArrows) =>
            prevArrows.some(
              (arrow) =>
                arrow[0] === newArrow[0] &&
                arrow[1] === newArrow[1] &&
                arrow[2] === newArrow[2]
            )
              ? prevArrows.filter(
                  (arrow) =>
                    !(
                      arrow[0] === newArrow[0] &&
                      arrow[1] === newArrow[1] &&
                      arrow[2] === newArrow[2]
                    )
                )
              : [...prevArrows, newArrow]
          );
        }
      }
      setDragStartSquare(null);
      setCurrentArrow(null);
    }
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    const updateBoardWidth = () => {
      if (boardRef.current) {
        const boardRect = boardRef.current.getBoundingClientRect();
        setBoardWidth(boardRect.width);
      }
    };

    updateBoardWidth();
    const resizeObserver = new ResizeObserver(updateBoardWidth);
    if (boardRef.current) {
      resizeObserver.observe(boardRef.current);
    }

    return () => {
      if (boardRef.current) {
        resizeObserver.unobserve(boardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setArrows(arrowsToShow);
  }, [arrowsToShow]);

  useEffect(() => {
    setMarkedSquares(higlightedSquares);
  }, [higlightedSquares]);

  console.log("squares", markedSquares)
  return (
    <div
      className="flex justify-center items-center w-full h-full"
      ref={boardRef}
      onContextMenu={handleContextMenu}
    >
      {boardWidth > 0 && (
        <div
          className="relative"
          onContextMenu={(e) => e.preventDefault()}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Chessboard
            ref={chessboardRef}
            disabled={disabled}
            boardOrientation={boardOrientation}
            boardWidth={boardWidth}
            customArrows={currentArrow ? [...arrows, currentArrow] : arrows}
            {...rest}
          />
          {markedSquares.map(({ square, color }) => {
            const { x, y } = getSquarePosition(square);
            return (
              <div
                key={square}
                className="absolute flex p-1 justify-center items-center"
                style={{
                  top: y,
                  left: x,
                  width: boardWidth / 8,
                  height: boardWidth / 8,
                }}
              >
                <div
                  className="w-full h-full border-4 rounded-full bg-transparent"
                  style={{ borderColor: color }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(ChessboardWithArrow);
