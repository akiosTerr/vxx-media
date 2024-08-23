/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { apiUrl } from "@utils/url";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface VideoPlayerProps {
  width?: number;
  height?: number;
}


const PlayerMain = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3em;
  margin: auto;
`;

const VideoElement = styled.video`
  margin: auto;
`;

const FolderBtnGrp = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
`;

const MasterPlayer: React.FC<VideoPlayerProps> = ({
  width = 1240,
  height = 720,
}) => {
  const { id } = useParams();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [folders, setFolders] = useState<File[]>([]);
  const [currentFolderIdx, setCurrentFolderIdx] = useState(0);
  const [videoList, setVideoList] = useState<string[]>([]);
  const [directory, setDirectory] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/files`);
        const data: File[] = await response.json();
        setFolders(data);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        // setLoading(false);
      }
    };
    console.log(id);
    fetchFiles();
  }, []);

  const getFolderFromIndex = useCallback(
    (idx: number) => {
      return folders[idx].name;
    },
    [folders]
  );

  const fetchFilesWithDir = useCallback(
    async (idx: number) => {
      try {
        const directory = getFolderFromIndex(idx);
        const response = await fetch(`${apiUrl}/api/files/${directory}`);
        const data: File[] = await response.json();
        const videoNames = data.map(
          (item) => `${apiUrl}/video/${directory}/${item.name}`
        );
        setDirectory(directory);
        setVideoList(videoNames);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        // setLoading(false);
      }
    },
    [getFolderFromIndex]
  );

  useEffect(() => {
    fetchFilesWithDir(currentFolderIdx);
  }, [currentFolderIdx, fetchFilesWithDir]);

  const getRandomMax = (max: number): number => {
    return Math.floor(Math.random() * max);
  };

  const handleNextFolder = () => {
    setCurrentFolderIdx((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  const handlePrevFolder = () => {
    setCurrentFolderIdx(
      (prevIndex) => (prevIndex - 1 + videoList.length) % videoList.length
    );
  };

  const randomizeVideo = () => {
    const idx = getRandomMax(folders.length - 1);
    fetchFilesWithDir(idx);
  };

  const changeVideo = () => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  const setRandomVideo = () => {
    setCurrentVideoIndex(getRandomInt(videoList.length - 1));
    changeVideo();
  };

  useEffect(() => {
    setRandomVideo();
  }, [videoList]);

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length);
    changeVideo();
  };

  const handlePrev = () => {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex - 1 + videoList.length) % videoList.length
    );
    changeVideo();
  };

  return (
    <PlayerMain>
      <h2>{directory}</h2>
      <FolderBtnGrp>
        <button onClick={handlePrevFolder}>prev</button>
        <button onClick={randomizeVideo}>VXX</button>
        <button onClick={handleNextFolder}>next</button>
      </FolderBtnGrp>
      <VideoElement ref={videoRef} width={width} height={height} controls>
        <source src={`${videoList[currentVideoIndex]}`} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoElement>
      <p>{videoList[currentVideoIndex]}</p>
      <div>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={setRandomVideo}>randomize</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </PlayerMain>
  );
};

export default MasterPlayer;
