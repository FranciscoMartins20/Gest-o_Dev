import axios from 'axios';

const API_URL = 'http://localhost:4000'; 

export const loginUser = async (CC,Password) => { 
  try {
    console.log('Fazendo requisição de login para:', `${API_URL}/login`);
    console.log('Dados do login:', { CC, Password });

    const response = await axios.post(`${API_URL}/login`, {
      CC,
      Password
    });

    console.log('Resposta da requisição de login:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Erro ao fazer login:', error.response);
    throw error.response.data; 
  }
};
