import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    try {
      localStorage.removeItem('jwtToken');
      // Aqui você também poderia limpar qualquer outro estado ou dado relacionado ao usuário
     localStorage.removeItem('isAuthenticated');

      // TODO: Adicione aqui a limpeza do seu estado global, se estiver utilizando

      // Verificação opcional para confirmar se o token foi removido
      if (!localStorage.getItem('jwtToken')) {
        navigate('/login');
      } else {
        console.error('Falha ao realizar o logout');
        // Trate o erro conforme necessário
      }
    } catch (error) {
      console.error('Erro ao realizar o logout:', error);
      // Trate o erro conforme necessário
    }
  };

  return logout;
};

export default useLogout;
