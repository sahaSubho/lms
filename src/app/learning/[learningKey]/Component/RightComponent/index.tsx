/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from "react";
import CCButton from "@/atom/CCButton";
import CCText from "@/atom/CCText";
import Spacer from "@/atom/Spacer";
import JumpToModal from "../JumpToModal";
import CCDivider from "@/atom/CCDivider";
import { FaCircleCheck } from "react-icons/fa6";

type Page = {
  id: number;
  heading: string;
  index?: string;
  text: string;
  content: string;
  content_type: "chess_position" | "video" | "img";
  mcq: {
    question: string;
    options: string[];
    answer: string;
  };
  position_order: number;
  is_solved: boolean;
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

  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

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

  return (
    <div
      className="flex flex-col justify-between items-center "
      style={{
        width: "-webkit-fill-available",
      }}
    >
      <div
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
          <CCText className="text-lg">
            {`${pageSelectedDetails?.index || 1}. ${
              pageSelectedDetails?.heading || ""
            }`}
          </CCText>

          <JumpToModal
            learningData={learningData}
            // @ts-ignore
            pageSelectedDetails={pageSelectedDetails}
            onChange={onChange}
          />
        </div>
        <Spacer spacing={12} />

        {/* Render the processed JSX content */}
        <div
          className="flex flex-col font-medium text-textColor overflow-auto"
          style={{ whiteSpace: "break", height: "54vh" }}
        >
          {pageSelectedDetails?.text}
          {pageSelectedDetails?.mcq && (
            <>
              {pageSelectedDetails?.mcq?.question}
              <Spacer spacing={20} />
              {pageSelectedDetails?.mcq?.options.map((o, i) => (
                <CCButton
                  key={i}
                  buttonStyle="square"
                  buttonType={selectedAnswer === o ? undefined : "white"}
                  className={`mb-2 pl-4 pr-4 flex justify-between text-start ${
                    selectedAnswer === pageSelectedDetails?.mcq?.answer
                      ? "bg-brand-aqua"
                      : "bg-brand-red"
                  }`}
                  onClick={() => setSelectedAnswer(o)}
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

      <div className="flex justify-between items-center">
        <div className="flex-[0.5] flex flex-col justify-start items-start">
          <CCButton buttonStyle="square" buttonType="white">
            Previous
          </CCButton>
          <CCText className="mt-2 text-xs text-textColor-lightBrown">
            The concept of a fortress. Some element...
          </CCText>
        </div>
        <div className="flex-[0.5] flex flex-col justify-end items-end">
          <CCButton
            buttonStyle="square"
            buttonType={
              selectedAnswer === pageSelectedDetails?.mcq?.answer
                ? "yellow"
                : "white"
            }
            onClick={() => {
              if (pageSelectedDetails && handleMarkComplete) {
                handleMarkComplete(
                  pageSelectedDetails?.content_type,
                  pageSelectedDetails?.id,
                  "c6"
                );
              }
            }}
          >
            Next
          </CCButton>
          <CCText className="mt-2 text-xs text-textColor-lightBrown text-end">
            The concept of a fortress. Some element...
          </CCText>
        </div>
      </div>
    </div>
  );
}

export default RightComponent;
