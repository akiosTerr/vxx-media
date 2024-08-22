import styled from "styled-components";
import { VideoFiles } from "../types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getThumbnailUrl } from "@utils/formaters";

interface VideoGroupProps {
  videoFiles: VideoFiles;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const VideoCard = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background: #3333339d;
  margin: auto 10px;
  padding: 10px;
`;

const Thumbnail = styled.img`
  width: 250px;
  height: 250px;
`;

const Header = styled.h2`
  color: white;
  cursor: pointer;
`;

const VideoTitle = styled.p`
  font-size: 1rem;
`;

const VideoGroup: React.FC<VideoGroupProps> = ({ videoFiles }) => {
  const navigate = useNavigate();

  const handleRedirectVideo = (videoId: string) => {
    navigate(`/player/${videoFiles.name}/${videoId}`); 
  };

  const handleRedirectTag = () => {
    navigate(`/tags/${videoFiles.name}`); 
  };

  useEffect(() => {
    console.log(videoFiles);
  }, [videoFiles]);

  return (
    <Wrapper>
      <Header onClick={handleRedirectTag}>{videoFiles.name}</Header>
      <Row>
        {videoFiles.videos.map((video) => (
          <VideoCard
            onClick={() => {
              handleRedirectVideo(video.name);
            }}
          >
            <Thumbnail src={getThumbnailUrl(video.name)} alt="" />
            <VideoTitle>{video.name}</VideoTitle>
          </VideoCard>
        ))}
      </Row>
    </Wrapper>
  );
};

export default VideoGroup;
