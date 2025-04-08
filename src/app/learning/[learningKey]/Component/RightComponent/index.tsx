/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CCButton from "@/atom/CCButton";
import CCText from "@/atom/CCText";
import Spacer from "@/atom/Spacer";
import JumpToModal from "../JumpToModal";
import CCDivider from "@/atom/CCDivider";
import { FaCircleCheck, FaLeftLong, FaRightLong } from "react-icons/fa6";
import CoinBg from "@/assets/Components/Coin_bg.png";
import Coin from "@/assets/Components/borderCoin.svg";
import { getS3Link } from "@/utils/getS3SignedUrl";
import { Chess } from "chess.js";
import useChessStore from "@/store/chessStore";
import { getColors } from "@/utils/commonUtils";

type Page = {
  id: number;
  heading: string;
  index?: string;
  text: string;
  content: string;
  content_type: "chess_position" | "video" | "img";
  mcq?: {
    question: string;
    options: string[];
    answer: string;
  };
  points: number;
  position_order: number;
  is_solved: boolean;
  moves: {
    ply: number;
    move: string;
    comment: string;
    arrows: { from: string; to: string; color: string }[];
    highlighted_squares: { square: string; color: string }[];
  }[];
  arrows: { from: string; to: string; color: string }[];
  highlighted_squares: { square: string; color: string }[];
  board_disable: boolean;
  custom_pieces: { [key: string]: string };
};

type RightComponentProps = {
  pageSelected?: Page;
  learningData: any;
  onChange: any;
  handleMove?: (move: string) => void; // handleMove now accepts a move string
  handleMarkComplete?: (
    contentType: string,
    pageId: number,
    move?: string
  ) => void;
};

function RightComponent({
  pageSelected,
  learningData,
  onChange,
  handleMove,
  handleMarkComplete,
}: RightComponentProps) {
  const [pageSelectedDetails, setPageSelectedDetails] = useState<Page | null>(
    null
  );

  const chessFen = useChessStore((state) => state.fen);
  const chessArrows = useChessStore((state) => state.arrows);
  const higlightedSquares = useChessStore((state) => state.squares);

  const updateFen = useChessStore((state) => state.updateFen);
  const updateArrows = useChessStore((state) => state.updateArrows);
  const updateSquares = useChessStore((state) => state.updateSquares);

  const [moveIndex, setMoveIndex] = useState<number>(0);
  const [moveComment, setMoveComment] = useState<string>("");

  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [confirmAnswer, setConfirmAnswer] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    if (pageSelected) {
      // const dummytxt =
      //   "<h3>Understanding the Opening Phase</h3> " +
      //   "<p>In chess, the opening phase is crucial for controlling the center and developing pieces. Here is an example of how the game can progress from the start.</p> " +
      //   "<p><strong>1. e4</strong> - White opens by advancing the king's pawn two squares.</p>" +
      //   "<p><strong>Black's response:</strong></p>" +
      //   "<button data-move='e5'>1... e5</button> - Black mirrors White's move, opening up their king's pawn." +
      //   "<p><strong>2. Nf3</strong> - White develops their knight to control the center and prepare for castling.</p>" +
      //   "<p><strong>Black's response:</strong></p>" +
      //   "<button data-move='Nc6'>2... Nc6</button> - Black develops their knight to counter White's knight and also control the center." +
      //   "<p><strong>3. Bb5</strong> - White plays the Ruy Lopez, attacking the knight and preparing to dominate the center.</p>" +
      //   "<p><strong>Black's response:</strong></p>" +
      //   "<button data-move='a6'>3... a6</button> - Black attacks White's bishop, forcing it to either retreat or exchange." +
      //   "<p><strong>4. Ba4</strong> - White retreats the bishop to maintain pressure on the knight at c6.</p>" +
      //   "<p><strong>Black's response:</strong></p>" +
      //   "<button data-move='Be7'>4... Be7</button> - Black prepares to castle by developing the bishop to a safe square." +
      //   "<p><strong>5. O-O</strong> - White castles, ensuring king safety and connecting the rooks.</p>" +
      //   "<p><strong>Black's response:</strong></p>" +
      //   "<button data-move='O-O'>5... O-O</button> - Black also castles, ensuring king safety and completing development." +
      //   "<p><strong>Next Move:</strong> It's White's turn. What should White do next?</p>" +
      //   "<button data-move='d3'>6. d3</button> - White plays d3 to support the pawn on e4 and open up lines for their dark-squared bishop." +
      //   "<button data-move='d4'>6. d4</button> - Alternatively, White can play d4 to challenge Black's pawn on e5 and open up the center." +
      //   "<p><strong>Summary:</strong> The opening moves focus on controlling the center, developing pieces, and ensuring king safety through castling. The game is now transitioning into the middle game, where tactical and strategic decisions will play a critical role.</p>";

      // const updatedJSX = processText(pageSelected.text);
      const obj = { ...pageSelected };
      if (pageSelected?.text) {
        // @ts-ignore
        obj.text = processText(pageSelected?.text);
      }
      // @ts-ignore
      setPageSelectedDetails(obj);
      setMoveComment("");
      setMoveIndex(0);
      if (pageSelected.mcq && pageSelected.is_solved) {
        setConfirmAnswer(true);
        setSelectedAnswer(pageSelected.mcq.answer);
      }else{
        setSelectedAnswer("")
        setConfirmAnswer(false);
      }
    }
  }, [pageSelected]);

  const processText = (text: string) => {
    const elements = [];
    let lastIndex = 0;

    // Updated regex to handle quoted and unquoted data-move values
    const moveRegex =
      /<button[^>]*data-move\s*=\s*(['"]?)(.*?)\1[^>]*>(.*?)<\/button>/g;

    let match;

    while ((match = moveRegex.exec(text)) !== null) {
      const [fullMatch, , move, buttonText] = match; // Ignore the quote group, capture move and buttonText
      if (match.index > lastIndex) {
        elements.push(
          <div
            style={{
              wordBreak: "break-word",
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}
            dangerouslySetInnerHTML={{
              __html: text.slice(lastIndex, match.index),
            }}
          />
        );
      }

      elements.push(
        <a
          key={move}
          style={{ color: "#3dab9e" }}
          onClick={() =>
            handleMove && handleMove(move || buttonText?.toLowerCase())
          } // Handle move on click
        >
          {buttonText}
        </a>
      );

      lastIndex = moveRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(
        <div
          style={{
            wordBreak: "break-word",
            whiteSpace: "normal",
            overflowWrap: "break-word",
          }}
          dangerouslySetInnerHTML={{
            __html: text.slice(lastIndex),
          }}
        />
      );
    }

    return elements;
  };

  const getTextBasedOnType = (type: string | undefined) => {
    switch (type) {
      case "mcq":
        return "Solve MCQ and move ahead";
      case "img":
        return "View this image and learn something";
      case "video":
        return "Watch the video and learn something";
      default:
        return "Make a move on the board and win";
    }
  };

  const triggerSoundForMcq = async () => {
    if (selectedAnswer === pageSelectedDetails?.mcq?.answer) {
      const res: { url?: string | undefined; error?: unknown | undefined } =
        await getS3Link("sounds/correct_move.wav");
      if (res.url) {
        const correctSound = new Audio(res.url);
        correctSound.play();
      }
    } else {
      const res: { url?: string | undefined; error?: unknown | undefined } =
        await getS3Link("sounds/wrong_move.wav");
      if (res.url) {
        const wrongMoveSound = new Audio(res.url);
        wrongMoveSound.play();
      }
    }
  };

  const handlePrevMove = () => {
    if (chessFen !== "") {
      const game = new Chess(chessFen, { skipValidation: true });
      const prevMove = pageSelectedDetails?.moves.find(
        (m, i) => i === moveIndex - 1
      );

      if (prevMove) {
        const drag = prevMove?.move.slice(0, 2);
        const drop = prevMove?.move.slice(2, 4);
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
        game.move(prevMove.move);
        updateFen(game.fen());
        setMoveIndex((prev) => prev - 1);
        setMoveComment(prevMove.comment);
        if (prevMove?.arrows) {
          // @ts-ignore
          const arrowsArray: Arrow[] = prevMove.arrows.map((arrow) => [
            arrow.from,
            arrow.to,
            getColors(arrow.color),
          ]);
          updateArrows(arrowsArray);
        } else {
          updateArrows([]);
        }
        if (prevMove?.highlighted_squares) {
          const squares = prevMove.highlighted_squares.map((sq) => ({
            ...sq,
            color: getColors(sq.color),
          }));
          updateSquares(squares);
        } else {
          updateSquares([]);
        }
      }
    }
  };

  const handleNextMove = () => {
    if (chessFen !== "") {
      const game = new Chess(chessFen, { skipValidation: true });
      const nextMove = pageSelectedDetails?.moves.find(
        (m, i) => i === moveIndex
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
        setMoveIndex((prev) => prev + 1);
        setMoveComment(nextMove.comment);
        if (nextMove?.arrows) {
          // @ts-ignore
          const arrowsArray: Arrow[] = nextMove.arrows.map((arrow) => [
            arrow.from,
            arrow.to,
            getColors(arrow.color),
          ]);
          updateArrows(arrowsArray);
        } else {
          updateArrows([]);
        }
        if (nextMove?.highlighted_squares) {
          const squares = nextMove.highlighted_squares.map((sq) => ({
            ...sq,
            color: getColors(sq.color),
          }));
          updateSquares(squares);
        } else {
          updateSquares([]);
        }
      }
    }
  };

  useEffect(() => {
    if (selectedAnswer && confirmAnswer && pageSelectedDetails?.mcq && !pageSelectedDetails.is_solved)
      triggerSoundForMcq();
  }, [selectedAnswer, confirmAnswer]);

  return (
    <div
      className="flex flex-col justify-between items-center "
      style={{
        width: "-webkit-fill-available",
      }}
    >
      <div className="sticky w-full bg-white px-6 py-3 flex justify-between items-center border-y-2">
        <CCText>
          {getTextBasedOnType(
            pageSelectedDetails?.mcq ? "mcq" : pageSelectedDetails?.content_type
          )}
        </CCText>
        {pageSelectedDetails?.points && (
          <CCButton
            className="px-4 z-10"
            textColor="white"
            buttonType="darkYellow"
            icon={<Image src={Coin} alt="Coin" width={20} height={20} />}
          >
            Earn {String(pageSelectedDetails?.points)}
          </CCButton>
        )}
        <Image
          src={CoinBg}
          alt="Coin Bg"
          width={40}
          height={100}
          className="h-full absolute right-0"
        />
      </div>
      <div
        className="p-6"
        style={{
          width: "-webkit-fill-available",
        }}
      >
        <div
          className="flex justify-between items-center"
          style={{
            width: "-webkit-fill-available",
          }}
        >
          <CCText className="text-2xl">
            {`${pageSelectedDetails?.index || 1}. ${
              pageSelectedDetails?.heading || ""
            }`}
          </CCText>

          {/* <JumpToModal
            learningData={learningData}
            // @ts-ignore
            pageSelectedDetails={pageSelectedDetails}
            onChange={onChange}
          /> */}
        </div>
        <Spacer spacing={12} />

        {/* Render the processed JSX content */}
        <div
          className="flex flex-col text-xl font-medium text-textColor overflow-auto"
          style={{ whiteSpace: "break", height: "54vh" }}
        >
          {pageSelectedDetails?.text}
          {moveComment && (
            <>
              <br />
              {moveComment.replace(/\[.*?\]\s*/g, "").trim()}
            </>
          )}
          {(pageSelectedDetails?.moves?.length ?? 0) > 0 &&
            moveIndex < (pageSelectedDetails?.moves?.length ?? 0) &&
            pageSelectedDetails?.points === 0 && (
              <div className="mt-5 flex justify-evenly items-center">
                <CCButton
                  disable={moveIndex === 0}
                  className="w-48"
                  buttonStyle="square"
                  onClick={handlePrevMove}
                >
                 <FaLeftLong
                  size={20}
                  className="text-white bg-brand-yellow rounded-full"
                  />
                </CCButton>
                <CCButton
                  disable={moveIndex === pageSelectedDetails?.moves?.length}
                  className="w-48"
                  buttonStyle="square"
                  onClick={handleNextMove}
                >
                 <FaRightLong
                  size={20}
                  className="text-white bg-brand-yellow rounded-full"
                  />
                </CCButton>
              </div>
            )}
          {!!pageSelectedDetails?.mcq && (
            <>
              {pageSelectedDetails?.mcq?.question}
              <Spacer spacing={20} />
              {pageSelectedDetails?.mcq?.options.map((o, i) => (
                <CCButton
                  key={i}
                  buttonStyle="square"
                  buttonType={
                    selectedAnswer === o
                      ? confirmAnswer
                        ? selectedAnswer === pageSelectedDetails?.mcq?.answer
                          ? "aqua"
                          : "orange"
                        : "darkBrown"
                      : "white"
                  }
                  className={`mb-2 pl-4 pr-4 flex text-start`}
                  textStyle={{ justifyContent: "space-between", width: "100%" }}
                  onClick={() => {
                    setConfirmAnswer(false);
                    setSelectedAnswer(o);
                  }}
                >
                  <div className={selectedAnswer === o ? "text-white" : ""}>
                    {String.fromCharCode(65 + i)}.
                    <Spacer horizontal />
                    {o}
                  </div>
                  {selectedAnswer === o ? (
                    <FaCircleCheck
                      size={20}
                      className="text-brand-yellow bg-brand-darkBrown rounded-full"
                    />
                  ) : (
                    <></>
                  )}
                </CCButton>
              ))}
            </>
          )}
        </div>
      </div>

      <Spacer spacing={22} />
      <CCDivider />
      <Spacer spacing={32} />

      <div className="flex w-full px-5 justify-between items-center">
        <div className="flex-[0.5] flex flex-col justify-start items-start">
          <CCButton
            buttonStyle="square"
            buttonType="white"
            onClick={() => onChange(pageSelectedDetails, "prev")}
          >
            Previous
          </CCButton>
        </div>
        <div className="flex-[0.5] flex flex-col justify-end items-end">
          {!pageSelectedDetails?.mcq ? (
            <CCButton
              disable={!pageSelectedDetails?.custom_pieces && moveIndex < (pageSelectedDetails?.moves?.length ?? 0)}
              buttonStyle="square"
              onClick={() => {
                setConfirmAnswer(false);
                if (
                  handleMarkComplete &&
                  !pageSelectedDetails?.is_solved &&
                  pageSelectedDetails?.points === 0
                )
                  handleMarkComplete(
                    pageSelectedDetails?.content_type,
                    pageSelectedDetails?.id
                  );
                
                onChange(pageSelectedDetails, "next");
              }}
              buttonType="yellow"
            >
              Next
            </CCButton>
          ) : (
            <CCButton
              buttonStyle="square"
              buttonType={
                !confirmAnswer ||
                selectedAnswer === pageSelectedDetails?.mcq?.answer
                  ? "yellow"
                  : "white"
              }
              onClick={() => {
                if (selectedAnswer) {
                  if (
                    confirmAnswer &&
                    selectedAnswer === pageSelectedDetails?.mcq?.answer &&
                    handleMarkComplete &&
                    pageSelectedDetails
                  ) {
                    if (!pageSelectedDetails.is_solved)
                      handleMarkComplete(
                        pageSelectedDetails?.content_type,
                        pageSelectedDetails?.id
                      );
                    onChange(pageSelectedDetails, "next");
                  } else {
                    setConfirmAnswer(true);
                  }
                  setRetryCount((prev) => prev + 1);
                }
              }}
            >
              {confirmAnswer &&
              selectedAnswer === pageSelectedDetails?.mcq?.answer
                ? "Next"
                : confirmAnswer
                ? "Try Again"
                : "Confirm"}
            </CCButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default RightComponent;
