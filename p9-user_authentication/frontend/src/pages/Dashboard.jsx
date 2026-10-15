
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(function () {
    async function loadUser() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/me`,
          { credentials: "include" }
        );

        const data = await response.json();

        if (!response.ok) {
          navigate("/login", { replace: true });
          return;
        }

        setUser(data.user);
      } catch (error) {
        setError("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [navigate]);

  async function handleLogout() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        setError("Logout failed. Please try again.");
        return;
      }

      navigate("/login", { replace: true });
    } catch (error) {
      setError("Could not connect to the server.");
    }
  }

  if (loading) {
    return <p className="p-8 text-center">Loading dashboard...</p>;
  }

  if (error) {
    return <p role="alert" className="p-8 text-center text-red-600">{error}</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-slate-800">
          MERN Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-blue-600">
            AUTHENTICATED USER
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-800">
            Welcome, {user.name}!
          </h2>

          <p className="mt-3 text-slate-600">
            You have successfully connected React, Express and MongoDB.
          </p>

          <div className="mt-8 rounded-xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Your email</p>
            <p className="mt-1 font-semibold text-slate-800">
              {user.email}
            </p>
          </div>

          <div className="mt-4 rounded-xl bg-blue-50 p-5">
            <p className="font-semibold text-blue-800">
              Authentication successful
            </p>
            <p className="mt-1 text-sm text-blue-700">
              This information was retrieved from your backend API.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
