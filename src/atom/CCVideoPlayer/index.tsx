"use client";
import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoPlayOutline, IoPauseOutline } from "react-icons/io5";

type VideoPlayerProps = {
  videoUrl: string;
  onVideoEnd?: () => void;
};

const CCVideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  onVideoEnd = () => {},
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true); // Controls visibility on hover

  // Toggle Play/Pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle Progress Change
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (videoRef.current) {
      videoRef.current.currentTime =
        (newProgress / 100) * videoRef.current.duration;
    }
  };

  // Update progress and current time based on video time
  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
        setProgress(
          (videoRef.current.currentTime / videoRef.current.duration) * 100
        );
      }
    };

    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
    };

    const videoElement = videoRef.current;
    videoElement?.addEventListener("timeupdate", handleTimeUpdate);
    videoElement?.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      videoElement?.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement?.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Format time as MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className="relative video-player-container group "
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className={`w-full h-auto ${!isPlaying && "blur-sm"}`}
        onClick={togglePlayPause}
        onPause={() => setShowControls(true)}
        onPlay={() => setShowControls(false)}
        onEnded={onVideoEnd}
      />
      {/* Centered Play/Pause Button */}
      {showControls && (
        <button
          onClick={togglePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:flex"
        >
          {!isPlaying ? (
            <div className="rounded-full w-[50px] h-[50px] bg-white flex justify-center items-center">
              <IoPlayOutline
                size={30}
                className="text-textColor-default text-4xl"
              />{" "}
            </div>
          ) : (
            <div className="rounded-full w-[50px] h-[50px] bg-white flex justify-center items-center">
              <IoPauseOutline
                size={30}
                className="text-textColor-default text-4xl"
              />{" "}
            </div>
          )}
        </button>
      )}
      {/* Progress Bar */}
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
        className="progress-bar absolute bottom-0 left-0 w-full h-2 appearance-none hide-thumb"
        style={{
          background: `linear-gradient(to right, #3DAB9E ${progress}%, #d1d1d1 ${progress}%)`,
        }}
      />
    </div>
  );
};

export default CCVideoPlayer;
