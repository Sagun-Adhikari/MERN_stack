import { useState } from "react";

function App() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState("");
  const [people, setPeople] = useState("");

  function handlePeopleChange(event) {
    setPeople(event.target.value);
  }

  const tipAmount = (Number(bill) * Number(tip)) / 100;
  const totalBill = Number(bill) + tipAmount;
  const perPerson = people > 0 ? totalBill / Number(people) : 0;

  return (
  <div className="container">
    <h1>Tip Calculator</h1>

    <div className="calculator">
      {/* Left side: User inputs */}
      <div className="input-section">
        <h2>Enter Details</h2>

        <label>Enter the bill</label>
        <input
          type="number"
          value={bill}
          onChange={(event) => setBill(event.target.value)}
          placeholder="Enter bill amount"
        />

        <label>Enter the tip (%)</label>
        <input
          type="number"
          value={tip}
          onChange={(event) => setTip(event.target.value)}
          placeholder="Enter tip percentage"
        />

        <label>Number of people</label>
        <input
          type="number"
          value={people}
          onChange={handlePeopleChange}
          placeholder="Enter number of people"
          min="1"
        />
      </div>

      {/* Right side: Results */}
      <div className="result-section">
        <h2>Results</h2>

        <div className="result-item">
          <p>Tip Amount</p>
          <h3>{tipAmount.toFixed(2)}</h3>
        </div>

        <div className="result-item">
          <p>Total Bill</p>
          <h3>{totalBill.toFixed(2)}</h3>
        </div>

        <div className="result-item highlight">
          <p>Bill Per Person</p>
          <h3>{perPerson.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  </div>
);
}

export default App;