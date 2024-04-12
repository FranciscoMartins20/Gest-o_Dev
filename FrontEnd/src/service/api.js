import axios from 'axios';

const API_URL = 'http://localhost:4000'; 

export const loginUser = async (CC, Password) => { 
    try {
      const response = await axios.post(`${API_URL}/login`, {
        CC,
        Password
      });
  
      
      const { token } = response.data;
  
      localStorage.setItem('token', token);
  
      
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error;
    }
  };
  
  export const logoutUser = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');
      
      // If there's a token, send a request to the logout endpoint
      if (token) {
        await axios.post(`${API_URL}/logout`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        // After logging out, remove the token from local storage
        localStorage.removeItem('token');
  
        // Optional: Redirect the user or perform other cleanup actions
        // window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error during logout:', error.response ? error.response.data : error.message);
      // Handle error (show message, redirect, etc.)
    }
  };
  

  // Adicione esta função no api.js

export const fetchTickets = async () => {
  try {
    const response = await axios.get(`${API_URL}/ticket/tickets`, {
   
    });
    return response.data; // Retorna os dados diretamente
  } catch (error) {
    console.error('Erro ao buscar tickets:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error;
  }
};
