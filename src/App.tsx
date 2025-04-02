// App.tsx
import { useState } from 'react';
import Terminal from './Terminal';
import './App.css';

function App() {
  const [showTerminal, setShowTerminal] = useState(true);

  const handleCloseTerminal = () => {
    setShowTerminal(false);
  };

  return (
    <div className="terminal-container">
      {showTerminal ? (
        <Terminal onClose={handleCloseTerminal} />
      ) : (
        <div className="terminal-closed">
          <h2>Terminal Closed</h2>
          <button onClick={() => setShowTerminal(true)}>Reopen Terminal</button>
        </div>
      )}
    </div>
  );
}

export default App;
