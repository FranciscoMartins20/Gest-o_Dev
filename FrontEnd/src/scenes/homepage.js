import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
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
        height: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Bem-vindo à Homepage
      </Typography>
      <Typography variant="body1" component="p" textAlign="center">
        Esta é uma homepage simples criada com o tema do Material-UI.
      </Typography>
      <AnimatedImage src={logoImage} alt="Animated Image" />
    </Box>
  );
};

export default HomePage;
