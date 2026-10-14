import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  function handleLogin(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken("");
  }

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Dashboard token={token} onLogout={handleLogout} />
  );
}

export default App;