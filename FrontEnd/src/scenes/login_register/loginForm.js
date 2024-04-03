import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';

const LoginForm = () => {
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password });
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" fullWidth>
        Sign In
      </Button>
    </Box>
  );
};

export default LoginForm;
