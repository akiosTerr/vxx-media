import { useEffect, useState } from "react";
import styled from "styled-components";
import { VideoFiles } from "./types";
import VideoGroup from "@components/VideoGroup";
import { apiUrl } from "@utils/url";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const Home: React.FC = () => {
  const [videoFiles, setVideoFiles] = useState<VideoFiles[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/homefiles`);
        const data: VideoFiles[] = await response.json();
        setVideoFiles(data);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchFiles();
  }, []);
  return (
    <Main>
      {videoFiles.map((item, index) => {
        return <VideoGroup key={index} videoFiles={item}></VideoGroup>;
      })}
    </Main>
  );
};

export default Home;
