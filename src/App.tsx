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
          <h2>you closed the terminal :(</h2>
          <button onClick={() => setShowTerminal(true)}>open the terminal again!</button>
        </div>
      )}
    </div>
  );
}

export default App;
