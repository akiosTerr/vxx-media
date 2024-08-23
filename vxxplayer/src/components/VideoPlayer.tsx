/* eslint-disable react-hooks/exhaustive-deps */
import { apiUrl } from "@utils/url";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface VideoPlayerProps {
  width?: number;
  height?: number;
}

const PlayerMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3em;
`

const VideoElement = styled.video`
  margin: auto;
`

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  width = 1240,
  height = 720,
}) => {
  const { id, folder } = useParams();
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, []);

  const getUrl = () => {
    return `${apiUrl}/video/${folder}/${id}`
  }

  return (
    <PlayerMain>
      
      <VideoElement ref={videoRef} width={width} height={height} controls>
        <source src={getUrl()} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoElement>
      <div>
        <button>Previous</button>
        <button>Next</button>
      </div>
    </PlayerMain>
  );
};

export default VideoPlayer;
