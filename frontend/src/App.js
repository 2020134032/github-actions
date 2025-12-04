import React, { useState } from 'react';
import './App.css';

const {
  REACT_APP_BACKEND_URL: BACKEND_BASE_URL = "http://localhost:8080"
} = window._ENV || process.env; // designate local test server when not specified

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [x, setX] = useState('');
  const [fib, setFib] = useState(null);
  const [fact, setFact] = useState(null);
  const [error, setError] = useState(null);

  const calculate = async () => {
    if (userInput === '' || isNaN(userInput) || userInput < 0) {
      setError('Please enter a valid nonnegative integer.');
      return;
    }

    setError(null);
    setFib(null);
    setFact(null);

    try {
      const [fibRes, factRes] = await Promise.all([
        fetch(`${BACKEND_BASE_URL}/fib?x=${userInput}`),
        fetch(`${BACKEND_BASE_URL}/fact?x=${userInput}`)
      ]);

      const fibData = await fibRes.json();
      const factData = await factRes.json();

      if (fibData.type === 'success') setFib(fibData.result);
      else setError('Failed to fetch Fibonacci result.');

      if (factData.type === 'success') setFact(factData.result);
      else setError('Failed to fetch factorial result.');

      setX(userInput);

    } catch (err) {
      setError('Server error occurred.');
    }
  };

  return (
    <div>
      <h2>Calculate Fibonacci and Factorial</h2>
      <input
        type="number"
        value={userInput}
        min="0"
        placeholder="Enter a number"
        onChange={e => setUserInput(e.target.value)}
      />
      <br />
      <button onClick={calculate} >
        Calculate
      </button>

      <div className="calcResult">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {fib !== null && <p>fib({x}) = <strong>{fib}</strong></p>}
        {fact !== null && <p>fact({x}) = <strong>{fact}</strong></p>}
      </div>
    </div>
  );
}