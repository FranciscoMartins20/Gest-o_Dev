import axios from 'axios';

const API_URL = 'http://192.168.68.94:4000'; 

export const loginUser = async (Username, Password) => { 
    try {
      const response = await axios.post(`${API_URL}/login`, {
        Username,
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

export const createTicket = async (ticketData) => {
  try {
    const token = localStorage.getItem('token'); // Recupera o token de autenticação do localStorage
    const response = await axios.post(`${API_URL}/ticket/tickets`, ticketData, {
      headers: {
        'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho para autenticação
      }
    });

    // Retorna os dados da resposta, que poderiam incluir detalhes do ticket criado
    return response.data;
  } catch (error) {
    console.error('Erro ao criar ticket:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error; // Lança erro para ser tratado pelo componente que chamou
  }
};

export const updateTicket = async (ticketId, ticketData) => {
  try {
    const token = localStorage.getItem('token'); // Recupera o token de autenticação do localStorage
    const response = await axios.put(`${API_URL}/ticket/tickets/${ticketId}`, ticketData, {
      headers: {
        'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho para autenticação
      }
    });

    // Retorna os dados da resposta, que podem incluir detalhes do ticket atualizado
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar ticket:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error; // Lança erro para ser tratado pelo componente que chamou
  }
};

export const fetchTicketDetails = async (ticketId) => {
  try {

    const response = await axios.get(`${API_URL}/ticket/tickets/${ticketId}`, {
   
    });

    // Retorna os dados do ticket, que será um objeto com todos os detalhes do ticket
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do ticket:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error; // Lança erro para ser tratado por quem chamou a função
  }
};
