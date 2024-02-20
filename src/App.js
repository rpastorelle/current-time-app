import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialTime = (new Date()).toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(initialTime);

  // Update the time every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Current time: {currentTime}
        </p>
      </header>
    </div>
  );
}

export default App;
