
import { Routes, Route, useNavigate  } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import LoginForm from "./scenes/login_register/loginForm";
import HomePage from "./scenes/homepage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import React, { useState, useEffect } from "react";
import TicketPage from "./scenes/tickets/ticketpage"

function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuthenticationStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(storedAuthenticationStatus);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate('/login');
  };
 // Trocar o TicketPage por Homepage (rever o menu)
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated ? <Sidebar onLogout={handleLogout} /> : null}
          <main className="content">
            <Topbar setIsSidebar={() => {}} />
            <Routes>
              <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/" element={isAuthenticated ? <TicketPage /> : <LoginForm onLoginSuccess={handleLoginSuccess} />} />  
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
