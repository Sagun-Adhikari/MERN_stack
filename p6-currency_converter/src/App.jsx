
import { useState } from "react";
import "./App.css";

function App() {
    const [amount, setAmount] = useState(1);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("NPR");
    const [result, setResult] = useState(null);

    async function convertCurrency() {
        try {
            const response = await fetch(
                `https://api.frankfurter.dev/v2/rate/${from}/${to}`
            );

            if (!response.ok) {
                throw new Error("Conversion failed");
            }

            const data = await response.json();
            setResult((Number(amount) * data.rate).toFixed(2));
        } catch (error) {
            setResult("Unable to convert");
        }
    }

    return (
        <div className="app">
            <h1>Currency Converter</h1>

            <input
                type="number"
                min="0"
                value={amount}
                onChange={function (event) {
                    setAmount(event.target.value);
                }}
            />

            <div>
                <select
                    value={from}
                    onChange={function (event) {
                        setFrom(event.target.value);
                    }}
                >
                    <option value="USD">USD - US Dollar</option>
                    <option value="NPR">NPR - Nepalese Rupee</option>
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                </select>

                <span> to </span>

                <select
                    value={to}
                    onChange={function (event) {
                        setTo(event.target.value);
                    }}
                >
                    <option value="NPR">NPR - Nepalese Rupee</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                </select>
            </div>

            <button onClick={convertCurrency}>
                Convert
            </button>

            {result !== null && (
                <h2>
                    Result: {result} {to}
                </h2>
            )}
        </div>
    );
}

export default App;
