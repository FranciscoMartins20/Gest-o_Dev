import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);  // Ativa o indicador de loading

    // Limpeza do localStorage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('isAuthenticated');

    // Adiciona um atraso para simular uma operação de logout e permitir a visualização do loading
    setTimeout(() => {
      setLoading(false);  // Desativa o loading
      navigate('/login', { replace: true });  // Redireciona para a página de login
    }, 1000);  // Atraso de 1 segundo
  };

  return { logout, loading };
};

export default useLogout;
