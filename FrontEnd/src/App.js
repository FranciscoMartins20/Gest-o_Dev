
import { Routes, Route, useNavigate  } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import LoginForm from "./scenes/login_register/loginForm";
import HomePage from "./scenes/homepage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import React, { useState, useEffect } from "react";
import TicketPage from "./scenes/tickets/ticketpage"
import CreateTicket from "./scenes/tickets/createticket";
import EditTicket from "./scenes/tickets/editticket"; // Ajuste o caminho conforme necessário


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
              <Route path="/" element={isAuthenticated ? <HomePage /> : <LoginForm onLoginSuccess={handleLoginSuccess} />} />  
              <Route path="/ticket" element={isAuthenticated ? <TicketPage /> : <LoginForm onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/create-ticket" element={isAuthenticated ? <CreateTicket /> : <LoginForm onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/edit-ticket/:ticketId" element={isAuthenticated ? <EditTicket /> : <LoginForm onLoginSuccess={handleLoginSuccess} />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
