import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import LoginForm from "./scenes/login_register/loginForm";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false); // Começa como false e será ativado após o login
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Novo estado para controle de autenticação

  // Simula a função de login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Define o usuário como autenticado
    setIsSidebar(true); // Ativa a sidebar após o login
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated && <Sidebar isSidebar={isSidebar} />} {/* Renderiza condicionalmente baseado no estado de autenticação */}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              {/* Passa a função de sucesso do login como prop para LoginForm */}
              <Route path="/" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
