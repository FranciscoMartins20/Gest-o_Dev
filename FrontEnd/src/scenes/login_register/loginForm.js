import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { loginUser } from '../../service/api'; 
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLoginSuccess } ) => {
  const theme = useTheme();
  const [CC, setCC] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
      const response = await loginUser(parseInt(CC), Password);
      console.log('Usuário logado:', response);
      onLoginSuccess();
      navigate('/')
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 400,
        m: 'auto',
        p: theme.spacing(3),
        backgroundColor: theme.palette.background.paper,
        borderRadius: '8px',
        boxShadow: theme.shadows[5],
      }}
    >
      <Typography variant="h6" textAlign="center">
       Bem-vindo !
      </Typography>
      <TextField
        label="CC" 
        variant="outlined"
        fullWidth
        required
        value={CC}
        onChange={(e) => setCC(e.target.value)} 
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        required
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" fullWidth>
        Entrar
      </Button>
    </Box>
  );
};

export default LoginForm;
