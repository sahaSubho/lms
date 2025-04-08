/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import CCChessboard from "@/atom/CCChessboard";
import CCText from "@/atom/CCText";
import CCVideoPlayer from "@/atom/CCVideoPlayer"; // Assuming this is your custom video player component
import useChessStore from "@/store/chessStore";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Chess, validateFen } from "chess.js";
import { getS3Link } from "@/utils/getS3SignedUrl";
import { getColors } from "@/utils/commonUtils";

type SelectedContentType = {
  chapterId: number;
  pageId: number;
  id: number;
  heading: string;
  text: string;
  content: string; // URL or FEN based on content_type
  content_type: "video" | "chess_position" | "img";
  custom_pieces: { [key: string]: string };
  position_order: number;
  is_solved: boolean;
  moves: {
    ply: number;
    move: string;
    comment: string;
  }[];
  arrows: { from: string; to: string; color: string }[];
  highlighted_squares: { square: string; color: string }[];
  board_disable: boolean;
};

type Arrow = [string, string, string];
type Square = { square: string; color: string };

type MiddleComponentProps = {
  selectedContent: SelectedContentType;
  handleMarkComplete: (
    contentType: string,
    pageId: number,
    move?: string
  ) => void;
};

const MiddleComponent: React.FC<MiddleComponentProps> = ({
  selectedContent,
  handleMarkComplete,
}) => {
  const [currentPageId, setCurrentPageId] = useState<number>(0);
  const chessFen = useChessStore((state) => state.fen);
  const chessArrows = useChessStore((state) => state.arrows);
  const higlightedSquares = useChessStore((state) => state.squares);

  const updateFen = useChessStore((state) => state.updateFen);
  const updateArrows = useChessStore((state) => state.updateArrows);
  const updateSquares = useChessStore((state) => state.updateSquares);

  const [customPositions, setCustomPositions] = useState<Record<
    string,
    string
  > | null>(null);
  // const [moveCount, setMoveCount] = useState<number>(0);
  const [moveIndex, setMoveIndex] = useState<number>(1);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(
    null
  );

  const [mediaUrl, setMediaUrl] = useState<string>("");

  const isWhiteChance = useMemo(
    () => selectedContent?.content?.includes(" w "),
    [selectedContent?.content]
  );

  useEffect(() => {
    if (
      selectedContent?.content &&
      selectedContent?.content_type === "chess_position"
    ) {
      updateFen(selectedContent?.content);
    }
    if (
      selectedContent?.custom_pieces &&
      Object.keys(selectedContent?.custom_pieces).length
    ) {
      setCustomPositions(selectedContent?.custom_pieces);
    } else {
      setCustomPositions(null);
    }
    if (selectedContent?.arrows) {
      // @ts-ignore
      const arrowsArray: Arrow[] = selectedContent.arrows.map((arrow) => [
        arrow.from,
        arrow.to,
        getColors(arrow.color),
      ]);
      updateArrows(arrowsArray);
    } else {
      updateArrows([]);
    }
    if (selectedContent?.highlighted_squares) {
      const squares: Square[] = selectedContent.highlighted_squares.map(
        (sq) => ({ ...sq, color: getColors(sq.color) })
      );
      updateSquares(squares);
    } else {
      updateSquares([]);
    }
    setMoveIndex(1);
    setLastMove(null);
    setCurrentPageId(selectedContent?.id);
    if (["img", "video"].includes(selectedContent?.content_type)) {
      fetchFromS3(selectedContent);
    }
  }, [selectedContent]);

  const fetchFromS3 = async (selectedContent: SelectedContentType) => {
    const filePath = selectedContent.content.split("/").splice(3).join("/");
    const res: { url?: string | undefined; error?: unknown | undefined } =
      await getS3Link(filePath);
    if (res.url) {
      setMediaUrl(res.url);
    }
  };

  const handleVideoEnd = () => {
    handleMarkComplete(selectedContent?.content_type, selectedContent?.id);
  };
  // @ts-ignore
  const handlePositionChange = async (newFenDetails) => {
    updateFen(newFenDetails?.newFen);
    setLastMove({ from: newFenDetails.from, to: newFenDetails.to });
    // setLastMove(newFenDetails.to);
    if (!!customPositions) {
      if (
        customPositions &&
        Object.keys(customPositions).includes(newFenDetails.to) &&
        ((Object.keys(customPositions).length > 1 &&
          customPositions[newFenDetails.to] !== "wF") ||
          Object.keys(customPositions).length === 1)
      ) {
        const res: { url?: string | undefined; error?: unknown | undefined } =
          await getS3Link("sounds/correct_move.wav");
        if (res.url) {
          const correctSound = new Audio(res.url);
          correctSound.play();
        }
        const updated = { ...customPositions };
        delete updated[newFenDetails.to];
        setCustomPositions(updated);
      } else if (
        customPositions &&
        Object.keys(customPositions).includes(newFenDetails.to)
      ) {
        const res: { url?: string | undefined; error?: unknown | undefined } =
          await getS3Link("sounds/wrong_move.wav");
        if (res.url) {
          const wrongMoveSound = new Audio(res.url);
          wrongMoveSound.play();
        }
        setTimeout(() => {
          updateFen(newFenDetails.lastFen);
        }, 100);
      }
    }
    console.log("handle position change");
    if (selectedContent.moves && validateFen(chessFen).ok) {
      const game = new Chess(newFenDetails?.newFen);
      let currentMoveIndex = moveIndex;
      if (game.turn() === "w") {
        currentMoveIndex += 1;
      }
      const correctMove = selectedContent.moves.find(
        (m) => m.ply === currentMoveIndex
      );
      if (
        correctMove?.move.includes(`${newFenDetails.from}${newFenDetails.to}`)
      ) {
        const res: { url?: string | undefined; error?: unknown | undefined } =
          await getS3Link("sounds/correct_move.wav");
        if (res.url) {
          const correctSound = new Audio(res.url);
          correctSound.play();
        }
        setTimeout(() => {
          const nextMove = selectedContent.moves.find(
            (m) => m.ply === currentMoveIndex + 1
          );

          if (nextMove) {
            const drag = nextMove?.move.slice(0, 2);
            const drop = nextMove?.move.slice(2, 4);
            const dropzone = document.querySelector(
              `[data-square="${drop}"]`
            )?.firstChild;

            if (dropzone) {
              //@ts-ignore
              dropzone.style.backgroundColor = "rgb(196, 181, 57)";
              //@ts-ignore
              dropzone.style.border = "2px solid rgb(120, 113, 64)";
              console.log(`Moved Item ${drag} to Dropzone ${drop}`);
            } else {
              console.error("Invalid draggable or dropzone ID");
            }
            game.move(nextMove.move);
            updateFen(game.fen());
            setMoveIndex(currentMoveIndex + 2);
          } else {
            handleMarkComplete(
              selectedContent?.content_type,
              selectedContent?.id
            );
          }
        }, 1000);
      } else {
        const res: { url?: string | undefined; error?: unknown | undefined } =
          await getS3Link("sounds/wrong_move.wav");
        if (res.url) {
          const wrongMoveSound = new Audio(res.url);
          wrongMoveSound.play();
        }
        setTimeout(() => {
          updateFen(newFenDetails.lastFen);
        }, 100);
      }
    }
    // setMoveCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (
      !selectedContent?.is_solved &&
      currentPageId === selectedContent?.id &&
      customPositions &&
      Object.keys(customPositions).length === 0
    ) {
      console.log("selected content", selectedContent);
      handleMarkComplete(selectedContent?.content_type, selectedContent?.id);
    }
  }, [customPositions]);

  return (
    <div className="h-full">
      {selectedContent?.content_type === "chess_position" && (
        <div
          className="flex flex-col justify-start"
          style={{ height: "100%", width: "78vh", margin: "auto" }}
        >
          {currentPageId === selectedContent?.id && (
            <div className="">
              <CCChessboard
                position={chessFen}
                skipValidation={!validateFen(chessFen).ok}
                customPositions={customPositions || {}}
                handleNewFen={handlePositionChange}
                arrowsToShow={chessArrows}
                higlightedSquares={higlightedSquares}
                disabled={selectedContent?.board_disable}
                lastMove={lastMove}
              />
            </div>
          )}
          {!customPositions && (
            <div className=" bg-brand-orange">
              <CCText className="text-center text-white">{`${
                isWhiteChance ? "White" : "Black"
              } to play`}</CCText>
            </div>
          )}
        </div>
      )}
      {selectedContent?.content_type === "video" && (
        <CCVideoPlayer videoUrl={mediaUrl} onVideoEnd={handleVideoEnd} />
      )}
      {selectedContent?.content_type === "img" && (
        <div style={{ height: "100%" }}>
          <Image
            src={mediaUrl}
            alt={selectedContent?.heading}
            // layout="responsive"
            width={600}
            height={600}
            // style={{ height: "100%" }}
            className="w-full h-full"
          />
        </div>
      )}
    </div>
  );
};

export default MiddleComponent;
