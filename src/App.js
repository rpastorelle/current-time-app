import React, { useState, useEffect } from 'react';
import './App.css';

const menuItems = [
  { id: '1', name: 'Home', children: [] },
  {
    id: '2',
    name: 'About',
    children: [
      { id: '2-1', name: 'Team', children: [] },
      { id: '2-2', name: 'Mission', children: [] },
    ],
  },
  // More items...
];

const MenuItem = ({ item, activePath, setActivePath }) => {
  const isActive = activePath.includes(item.id);
  const hasChildren = item.children?.length > 0;

  const handleClick = () => {
    // Set the active path
    setActivePath((prevActivePath) => {
      const pathIndex = prevActivePath.indexOf(item.id);
      if (pathIndex >= 0) {
        // collapse since it's already open
        return prevActivePath.slice(0, pathIndex);
      }
      // Append to active path
      return [...prevActivePath, item.id];
    });
  };

  return (
    <li>
      <div
        onClick={handleClick}
      >
        {item.name}
      </div>
      {hasChildren && isActive && (
        <ul>
          {item.children.map(child => (
            <MenuItem
              key={child.id}
              item={child}
              activePath={activePath}
              setActivePath={setActivePath}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const Menu = ({ menuItems = [] }) => {
  const [activePath, setActivePath] = useState([]);
  return (
    <ul>
      {menuItems.map(item => (
        <MenuItem
          key={item.id}
          item={item}
          activePath={activePath}
          setActivePath={setActivePath}
        />
      ))}
    </ul>
  );
};

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
      <Menu menuItems={menuItems} />
    </div>
  );
}

export default App;
