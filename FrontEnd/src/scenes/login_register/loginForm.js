// src/scenes/login_register/LoginForm.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';  // Certifique-se de que o caminho está correto

const LoginForm = () => {
  const theme = useTheme();
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const { login } = useAuth();  // Usando o login do contexto de autenticação
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      login();  // Atualizando estado de autenticação
      navigate('/');  // Navegação para a página inicial após login
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
        Bem-vindo!
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        required
        value={Username}
        onChange={(e) => setUsername(e.target.value)}
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
