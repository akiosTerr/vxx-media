import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface HeaderProps {}

const MainHeader = styled.div`
  text-align: start;
  background-color: black;
  width: 100vw;
`;

const Heading = styled.h1`
  margin: 0;
  color: red;
  cursor: pointer;
  width: fit-content;
`;

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/"); // Replace '/about' with your target route
  };

  return (
    <MainHeader>
      <Heading onClick={handleRedirect}>VXX</Heading>
    </MainHeader>
  );
};

export default Header;
