import React from 'react';
import { Box, useTheme } from '@mui/material';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import logoImage from './Logotipo_infodevelop.jpg';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AnimatedImage = styled('img')`
  animation: ${fadeIn} 2s ease-out;
  width: 100%; // ajuste conforme necessário
  max-width: 600px; // limite o tamanho máximo da imagem
`;

const HomePage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '75vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <AnimatedImage src={logoImage} alt="Animated Image" />
    </Box>
  );
};

export default HomePage;
