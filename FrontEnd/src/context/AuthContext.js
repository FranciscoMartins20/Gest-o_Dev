import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

    useEffect(() => {
        // Tentativa de restaurar o estado de autenticação do localStorage
        const storedAuth = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(storedAuth === 'true');
        setLoading(false); // Atualiza o estado de carregamento após verificar a autenticação
    }, []);

    const login = () => {
        localStorage.setItem('isAuthenticated', 'true'); // Armazena a autenticação no localStorage
        setIsAuthenticated(true); // Atualiza o estado de autenticação para verdadeiro
    };

    const logout = () => {
        localStorage.removeItem('isAuthenticated'); // Remove a autenticação do localStorage
        setIsAuthenticated(false); // Atualiza o estado de autenticação para falso
    };

    // Certifique-se de passar todos os métodos e estados necessários no valor do contexto
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {!loading && children} 
        </AuthContext.Provider>
    );
};
