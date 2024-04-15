import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

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
    </Box>
  );
};

export default HomePage;