"use client";
import { useState, useRef } from "react";

interface VideoPlayerProps {
  videoSrc: string;
  videoClassName: string;
  thumbnailSrc: string;
  containerClassName?: string;
  thumbnailClassName?: string;
  thumbnailImage?: string;
  playButtonClassName?: string;
  closeButtonClassName?: string;
  playIcon?: React.ReactNode | string; // Image path or ReactNode
  closeIcon?: React.ReactNode | string; // Image path or ReactNode
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  thumbnailSrc,
  videoClassName = "",
  containerClassName = "",
  thumbnailClassName = "",
  thumbnailImage = "",
  playButtonClassName = "",
  closeButtonClassName = "",
  playIcon,
  closeIcon,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  return (
    <div className={`relative  ${containerClassName}`}>
      {!isPlaying ? (
        <div
          className={`relative cursor-pointer ${thumbnailClassName}`}
          onClick={handlePlay}
        >
          <img
            src={thumbnailSrc}
            alt="Video Thumbnail"
            className={`${thumbnailImage}`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className={`${playButtonClassName}`}>
              {typeof playIcon === "string" ? (
                <img
                  src={playIcon}
                  alt="Play Icon"
                  className="min-w-[2.5rem] min-h-[2.5rem]"
                />
              ) : (
                playIcon
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={handleClose}
            className={`absolute top-2 right-2 p-2 shadow-lg cursor-pointer z-[50] ${closeButtonClassName}`}
          >
            {typeof closeIcon === "string" ? (
              <img
                src={closeIcon}
                alt="Close Icon"
                className="w-[2.5rem] h-[2.5rem]"
              />
            ) : (
              closeIcon
            )}
          </button>
          <video
            ref={videoRef}
            controls
            autoPlay
            className={`${videoClassName}`}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
