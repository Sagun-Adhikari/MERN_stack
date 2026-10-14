import { useState } from "react";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      props.onLogin(data.token);
    } catch (error) {
      setError("Cannot connect to the server");
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <p>Student Management System</p>

        <label>Username</label>
        <input
          value={username}
          onChange={function (event) {
            setUsername(event.target.value);
          }}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={function (event) {
            setPassword(event.target.value);
          }}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;