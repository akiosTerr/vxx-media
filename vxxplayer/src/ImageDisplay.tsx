import React from 'react';
import styled from 'styled-components';

interface ImageHeaderProps {
  imageUrl: string;
  headerText: string;
  altText: string;
  width?: string;
  height?: string;
}

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Header = styled.h1`
  margin-bottom: 20px;
`;

interface ImageProps {
  width?: string;
  height?: string;
}

const Image = styled.img<ImageProps>`
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
`;

const ImageHeader: React.FC<ImageHeaderProps> = ({ imageUrl, headerText, altText, width, height }) => {
  return (
    <Container>
      <Header>{headerText}</Header>
      <Image src={imageUrl} alt={altText} width={width} height={height} />
    </Container>
  );
};

export default ImageHeader;