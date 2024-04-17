import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    try {
      // Limpeza dos dados de autenticação e sessão do usuário
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('isAuthenticated');

      // TODO: Adicionar limpeza de estado global se necessário

      // Navegação direta para a tela de login após o logout
      navigate('/login');
    } catch (error) {
      console.error('Erro ao realizar o logout:', error);
      // Implementar tratamento de erros, como notificações para o usuário
    }
  };

  return logout;
};

export default useLogout;
