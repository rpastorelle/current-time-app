import React, { useState, useEffect } from 'react';
import './App.css';
import './Autocomplete.css';

const SUGGESTION_LIST = [
  "hello world",
  "goodnight moon",
  "good morning sun",
];

function App() {
  const initialTime = (new Date()).toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');

  // Update the time every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const searchHandler = (e) => {
    const value = e.target.value;
    setQuery(value);
    filterSuggestions(value);
  };

  const filterSuggestions = (searchQuery) => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }
    // TODO maybe get suggestions from server, then filter
    const filteredSuggestions = SUGGESTION_LIST.filter(s => {
      return s.startsWith(searchQuery);
    });

    setSuggestions(filteredSuggestions);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Current time: {currentTime}
        </p>
      </header>

      <div className="ac-wrapper">
        <input
          type="text"
          name="search"
          value={query}
          onChange={searchHandler}
        />

        <div className="ac-suggestions">
          {suggestions.map((suggestion, index) => (
            <div key={`suggestions-${index}`}>
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
