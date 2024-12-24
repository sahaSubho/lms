"use client";
import CCChessboard from "@/atom/CCChessboard";
import CCText from "@/atom/CCText";
import CCVideoPlayer from "@/atom/CCVideoPlayer"; // Assuming this is your custom video player component
import useChessStore from "@/store/chessStore";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";

type SelectedContentType = {
  chapterId: number;
  pageId: number;
  id: number;
  heading: string;
  text: string;
  content: string; // URL or FEN based on content_type
  content_type: "video" | "chess_position" | "img";
  position_order: number;
  is_solved: boolean;
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
  const chessFen = useChessStore((state) => state.fen);
  const updateFen = useChessStore((state) => state.updateFen);

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
  }, [selectedContent?.content]);

  const handleVideoEnd = () => {
    handleMarkComplete(selectedContent?.content_type, selectedContent?.id);
  };
  const handlePositionChange = (newFenDetails) => {
    updateFen(newFenDetails?.newFen);
  };
  return (
    <div style={{ height: "80vh" }}>
      {selectedContent?.content_type === "chess_position" && (
        <div
          className="flex flex-col justify-start"
          style={{ height: "100%", width: "80%", margin: "auto" }}
        >
          <div className="">
            <CCChessboard
              position={chessFen}
              handleNewFen={handlePositionChange}
            />
          </div>
          <div className=" bg-brand-orange">
            <CCText className="text-center text-white">{`${
              isWhiteChance ? "White" : "Black"
            } to play`}</CCText>
          </div>
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
