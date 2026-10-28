import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
function Signup() {
    return <h1>Signup Page</h1>;
}

function Login() {
    return <h1>Login Page</h1>;
}

function Dashboard() {
    return <h1>Dashboard</h1>;
}
const App = () => {
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/signup" />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
  )
}

export default App