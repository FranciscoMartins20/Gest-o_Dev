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
  
  