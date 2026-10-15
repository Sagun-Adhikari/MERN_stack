
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function checkLogin() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/me`,
          { credentials: "include" }
        );

        setAuthenticated(response.ok);
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  if (loading) {
    return <p className="p-8 text-center">Checking login...</p>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
