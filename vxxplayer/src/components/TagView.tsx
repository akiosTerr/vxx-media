import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getThumbnailUrl } from "@utils/formaters";

const Thumbnail = styled.img`
  width: 250px;
  height: 250px;
`;

const Header = styled.h1`
  color: white;
`;

const VideoTitle = styled.p`
  font-size: 1rem;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const VideoList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const VideoCard = styled.div`
  flex: 1 0 20%;
  box-sizing: border-box;
  padding: 10px;
  background-color: #0000006c;
  border: 1px solid white;
  cursor: pointer;

  &:nth-child(5n + 1) {
    clear: left;
  }
`;

const TagView: React.FC = () => {
  const navigate = useNavigate();
  const { folder } = useParams();
  const [videoFiles, setVideoFiles] = useState<File[]>([]);

  const apiUrl = "http://localhost:3001";

  const fetchFilesWithDir = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/api/files/${folder}`);
      const data: File[] = await response.json();
      setVideoFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      // setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFilesWithDir();
  }, [fetchFilesWithDir]);

  const handleRedirect = (videoId: string) => {
    navigate(`/player/${folder}/${videoId}`); 
  };

  return (
    <Main>
      <Header>{folder}</Header>
      <VideoList>
        {videoFiles.map((video, index) => (
          <VideoCard
            key={index}
            onClick={() => {
              handleRedirect(video.name);
            }}
          >
            <Thumbnail src={getThumbnailUrl(video.name)} alt="" />
            <VideoTitle>{video.name}</VideoTitle>
          </VideoCard>
        ))}
      </VideoList>
    </Main>
  );
};

export default TagView;
