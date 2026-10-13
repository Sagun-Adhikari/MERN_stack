
import { useState } from "react";
import "./App.css";

function App() {
    const [length, setLength] = useState(12);
    const [uppercase, setUppercase] = useState(true);
    const [lowercase, setLowercase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(false);
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    function generatePassword() {
        let characters = "";
        let requiredCharacters = "";

        if (uppercase) {
            characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            requiredCharacters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
        }

        if (lowercase) {
            characters += "abcdefghijklmnopqrstuvwxyz";
            requiredCharacters += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
        }

        if (numbers) {
            characters += "0123456789";
            requiredCharacters += "0123456789"[Math.floor(Math.random() * 10)];
        }

        if (symbols) {
            characters += "!@#$%^&*()_+-=[]{}?";
            requiredCharacters += "!@#$%^&*()_+-=[]{}?"[
                Math.floor(Math.random() * 20)
            ];
        }

        if (characters === "") {
            setPassword("");
            setMessage("Please select at least one option.");
            return;
        }

        let result = requiredCharacters;

        for (let i = result.length; i < length; i++) {
            result += characters[Math.floor(Math.random() * characters.length)];
        }

        result = result.split("").sort(function () {
            return Math.random() - 0.5;
        }).join("");

        setPassword(result);
        setMessage("");
    }

    async function copyPassword() {
        if (password === "") {
            setMessage("Generate a password first.");
            return;
        }

        try {
            await navigator.clipboard.writeText(password);
            setMessage("Password copied!");
        } catch (error) {
            setMessage("Unable to copy. Please copy it manually.");
        }
    }

    function getStrength() {
        if (password.length === 0) {
            return "";
        }

        let score = 0;

        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 2) return "Weak";
        if (score <= 3) return "Medium";
        return "Strong";
    }

    return (
        <div className="page">
            <div className="generator">
                <div className="icon"></div>

                <h1>Password Generator</h1>
                <br /><br />

                <div className="password-box">
                    <input
                        type="text"
                        value={password}
                        placeholder="Your password will appear here"
                        readOnly
                    />

                    <button className="copy-btn" onClick={copyPassword}>
                        Copy
                    </button>
                </div>

                {password !== "" && (
                    <div className="strength">
                        <span>Password strength</span>
                        <strong className={getStrength().toLowerCase()}>
                            {getStrength()}
                        </strong>
                    </div>
                )}

                <div className="length-section">
                    <div className="label-row">
                        <label>Password Length</label>
                        <span className="length-value">{length}</span>
                    </div>

                    <input
                        type="range"
                        min="4"
                        max="32"
                        value={length}
                        onChange={function (event) {
                            setLength(Number(event.target.value));
                        }}
                    />
                    <div className="range-labels">
                        <span>4 characters</span>
                        <span>32 characters</span>
                    </div>
                </div>

                <div className="options">
                    <h3>Customize Password</h3>

                    <label className="option">
                        <span>Uppercase letters (A-Z)</span>
                        <input
                            type="checkbox"
                            checked={uppercase}
                            onChange={function (event) {
                                setUppercase(event.target.checked);
                            }}
                        />
                    </label>

                    <label className="option">
                        <span>Lowercase letters (a-z)</span>
                        <input
                            type="checkbox"
                            checked={lowercase}
                            onChange={function (event) {
                                setLowercase(event.target.checked);
                            }}
                        />
                    </label>

                    <label className="option">
                        <span>Numbers (0-9)</span>
                        <input
                            type="checkbox"
                            checked={numbers}
                            onChange={function (event) {
                                setNumbers(event.target.checked);
                            }}
                        />
                    </label>

                    <label className="option">
                        <span>Symbols (!@#$...)</span>
                        <input
                            type="checkbox"
                            checked={symbols}
                            onChange={function (event) {
                                setSymbols(event.target.checked);
                            }}
                        />
                    </label>
                </div>

                <button className="generate-btn" onClick={generatePassword}>
                    Generate Password
                </button>

                {message !== "" && (
                    <p className="message">{message}</p>
                )}
            </div>
        </div>
    );
}

export default App;