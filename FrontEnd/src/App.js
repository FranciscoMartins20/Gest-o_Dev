// src/App.js
import React from "react";
import { Routes, Route} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/privateroute';
import LoginForm from "./scenes/login_register/loginForm"; 
import HomePage from "./scenes/homepage";
import TicketPage from "./scenes/tickets/ticketpage";
import CreateTicket from "./scenes/tickets/createticket";
import EditTicket from "./scenes/tickets/editticket";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";

function App() {
  const [theme, colorMode] = useMode();

  return (
      <AuthProvider>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <Sidebar />
              <main className="content">
                <Topbar setIsSidebar={() => {}} />
                <Routes>
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                  <Route path="/ticket" element={<PrivateRoute><TicketPage /></PrivateRoute>} />
                  <Route path="/create-ticket" element={<PrivateRoute><CreateTicket /></PrivateRoute>} />
                  <Route path="/edit-ticket/:ticketId" element={<PrivateRoute><EditTicket /></PrivateRoute>} />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </AuthProvider>
  );
}

export default App;
