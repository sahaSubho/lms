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

type SelectedContentType = {
  chapterId: number;
  pageId: number;
  id: number;
  heading: string;
  text: string;
  content: string; // URL or FEN based on content_type
  content_type: "video" | "chess_position" | "img";
  custom_pieces: Record<string, string>;
  position_order: number;
  is_solved: boolean;
  moves: {
    ply: number;
    move: string;
    comment: string;
  }[];
  arrows: string;
  board_disable: boolean;
};

type Arrow = [string, string, string];

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
  const updateFen = useChessStore((state) => state.updateFen);
  // const [lastMove, setLastMove] = useState("");
  const [arrowsToShow, setArrowsToShow] = useState<Arrow[]>([]);
  const [customPositions, setCustomPositions] = useState<Record<
    string,
    string
  > | null>(null);
  // const [moveCount, setMoveCount] = useState<number>(0);
  const [moveIndex, setMoveIndex] = useState<number>(1);

  const isWhiteChance = useMemo(
    () => selectedContent?.content?.includes(" w "),
    [selectedContent?.content]
  );

  const getColors = (key: string) => {
    switch (key) {
      case "R":
        return "red";
      case "B":
        return "blue";
      case "Y":
        return "yellow";
      case "G":
        return "green";
      default:
        return "green"; // default color
    }
  }


  useEffect(() => {
    if (
      selectedContent?.content &&
      selectedContent?.content_type === "chess_position"
    ) {
      updateFen(selectedContent?.content);
    }
    setCustomPositions(selectedContent?.custom_pieces);
    if (selectedContent?.arrows) {
      // @ts-ignore
      const arrowsArray: Arrow[] = selectedContent.arrows.map((arrow) =>
        [arrow.from,arrow.to,getColors(arrow.color)]
      );
      setArrowsToShow(arrowsArray);
    } else {
      setArrowsToShow([]);
    }
    setCurrentPageId(selectedContent?.id);
  }, [selectedContent]);

  const handleVideoEnd = () => {
    handleMarkComplete(selectedContent?.content_type, selectedContent?.id);
  };
  // @ts-ignore
  const handlePositionChange = async (newFenDetails) => {
    updateFen(newFenDetails?.newFen);
    console.log("position change", newFenDetails);
    // setLastMove(newFenDetails.to);
    if (!!customPositions) {
      if (
        customPositions &&
        Object.keys(customPositions).includes(newFenDetails.to) &&
        ((Object.keys(customPositions).length > 1 &&
          customPositions[newFenDetails.to] !== "wF") ||
          Object.keys(customPositions).length === 1)
      ) {
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
      const res: { url?: string | undefined; error?: unknown | undefined } =
        await getS3Link("sounds/correct_move.wav");
      if (res.url) {
        const correctSound = new Audio(res.url);
        correctSound.play();
      }
    } else if (selectedContent.moves) {
      const correctMove = selectedContent.moves.find(
        (m) => m.ply === moveIndex
      );
      if (correctMove?.move === `${newFenDetails.from}${newFenDetails.to}`) {
        const res: { url?: string | undefined; error?: unknown | undefined } =
          await getS3Link("sounds/correct_move.wav");
        if (res.url) {
          const correctSound = new Audio(res.url);
          correctSound.play();
        }
        setTimeout(() => {
          const game = new Chess(newFenDetails?.newFen);
          const nextMove = selectedContent.moves.find(
            (m) => m.ply === moveIndex + 1
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
          }
        }, 1000);
        setMoveIndex((prev) => prev + 2);
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
          <div className="">
            <CCChessboard
              position={chessFen}
              skipValidation={!validateFen(chessFen).ok}
              customPositions={customPositions || {}}
              handleNewFen={handlePositionChange}
              arrowsToShow={arrowsToShow}
              disabled={selectedContent?.board_disable}
            />
          </div>
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
        <CCVideoPlayer
          videoUrl={selectedContent?.content}
          onVideoEnd={handleVideoEnd}
        />
      )}
      {selectedContent?.content_type === "img" && (
        <div style={{ height: "100%" }}>
          <Image
            src={selectedContent?.content}
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
