/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import CCChessboard from "@/atom/CCChessboard";
import CCModal from "@/atom/CCModal";
import CCText from "@/atom/CCText";
import CCVideoPlayer from "@/atom/CCVideoPlayer"; // Assuming this is your custom video player component
import useChessStore from "@/store/chessStore";
import bg from "@/assets/Components/complete_bg.png";
import book from "@/assets/Components/Book.png";
import rectangle from "@/assets/Components/Rectangle.png";
import rectangle_2 from "@/assets/Components/Rectangle_2.png";
import star_border from "@/assets/Components/Union.png";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import CCButton from "@/atom/CCButton";
import StarRating from "@/atom/StarRating";
import { Chess } from "chess.js";

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
};

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
  const [lastMove, setLastMove] = useState("");
  const [customPositions, setCustomPositions] = useState<Record<
    string,
    string
  > | null>(null);
  const [showCompletePopup, setShowCompletePopup] = useState<boolean>(false);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [moveIndex, setMoveIndex] = useState<number>(1);

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
    setCustomPositions(selectedContent?.custom_pieces);
    setCurrentPageId(selectedContent?.id);
  }, [selectedContent?.content]);

  const handleVideoEnd = () => {
    handleMarkComplete(selectedContent?.content_type, selectedContent?.id);
  };
  // @ts-ignore
  const handlePositionChange = (newFenDetails) => {
    updateFen(newFenDetails?.newFen);
    setLastMove(newFenDetails.to);
    if (!!customPositions) {
      setCustomPositions((prev) => {
        if (prev && Object.keys(prev).includes(newFenDetails.to)) {
          const updated = { ...prev };
          delete updated[newFenDetails.to];
          return updated;
        }
        return prev;
      });
      const correctSound = new Audio(
        "https://cc-lms-production.s3.ap-south-1.amazonaws.com/sounds/correct_move.wav"
      );
      correctSound.play();
    } else if (selectedContent.moves) {
      const correctMove = selectedContent.moves.find(
        (m) => m.ply === moveIndex
      );
      if (correctMove?.move === `${newFenDetails.from}${newFenDetails.to}`) {
        const correctSound = new Audio(
          "https://cc-lms-production.s3.ap-south-1.amazonaws.com/sounds/correct_move.wav"
        );
        correctSound.play();
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
        const wrongMoveSound = new Audio(
          "https://cc-lms-production.s3.ap-south-1.amazonaws.com/sounds/wrong_move.wav"
        );
        wrongMoveSound.play();
        setTimeout(() => {
          updateFen(newFenDetails.lastFen);
        }, 100);
      }
    }
    setMoveCount((prev) => prev + 1);
  };

  console.log("customPositions", customPositions);

  useEffect(() => {
    if (
      !selectedContent?.is_solved &&
      currentPageId === selectedContent?.id &&
      customPositions &&
      Object.keys(customPositions).length === 0
    ) {
      setTimeout(() => {
        const pageCompleteSound = new Audio(
          "https://cc-lms-production.s3.ap-south-1.amazonaws.com/sounds/page_complete.wav"
        );
        pageCompleteSound.play();
        setShowCompletePopup(true);
      }, 1200);
    }
  }, [customPositions, selectedContent]);

  return (
    <div style={{ height: "80vh" }}>
      {selectedContent?.content_type === "chess_position" && (
        <div
          className="flex flex-col justify-start"
          style={{ height: "100%", width: "70%", margin: "auto" }}
        >
          <div className="">
            <CCChessboard
              position={chessFen}
              skipValidation={!!customPositions}
              customPositions={customPositions || {}}
              handleNewFen={handlePositionChange}
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
      {showCompletePopup && (
        <CCModal isOpen={showCompletePopup} type="center" onClose={() => {}}>
          <div className="flex flex-col items-center">
            <Image
              src={star_border}
              alt="Star"
              // layout="responsive"
              width={100}
              height={100}
              style={{
                maxWidth: "102%",
                width: "102%",
                height: "122%",
                top: -75,
              }}
              className="w-full absolute -left-1 -z-10"
            />
            <div
              className="relative flex flex-col justify-center items-center"
              style={{
                backgroundImage: `url(${bg.src})`,
                top: 5,
                left: 0,
                width: "109%",
                backgroundSize: "100%",
                height: 120,
              }}
            >
              <div
                className="absolute -top-16 flex justify-center items-center"
                style={{ gap: 36 }}
              >
                <StarRating percentage={100} />
                <StarRating percentage={100} />
                <StarRating percentage={100} />
              </div>
              <Image
                src={rectangle}
                alt="rect 1"
                // layout="responsive"
                width={60}
                height={400}
                style={{
                  position: "absolute",
                  left: 80,
                  height: 124,
                }}
              />
              <Image
                src={rectangle_2}
                alt="rect 2"
                // layout="responsive"
                width={40}
                height={400}
                style={{
                  position: "absolute",
                  left: 133,
                  height: 124,
                }}
              />
              <CCText style={{ color: "#fff", fontSize: 28 }}>Completed</CCText>
            </div>
            <Image
              src={book}
              alt="Book"
              // layout="responsive"
              width={400}
              height={400}
              // style={{ height: "100%" }}
              className="mt-5 m-auto"
            />
            <CCButton
              onClick={() => {
                handleMarkComplete(
                  selectedContent?.content_type,
                  selectedContent?.id,
                  lastMove
                );
                setShowCompletePopup(false);
              }}
              className="w-3/4 relative m-auto -top-5 border-4 border-white-500"
            >
              Continue
            </CCButton>
          </div>
        </CCModal>
      )}
    </div>
  );
};

export default MiddleComponent;
