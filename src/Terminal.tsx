import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';

interface TerminalProps {
  onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const initialLogs = [
    'Welcome to My Portfolio!',
    'Type "help" for available commands.',
    'Feel free to drag me (the terminal) around or resize me for visibility :)',
  ];

  const [logs, setLogs] = useState<string[]>(initialLogs);
  const [input, setInput] = useState('');

  // Ref for the terminal window and body (for auto scrolling)
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // State for dragging functionality and position
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // State for resizing functionality and dimensions
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [resizing, setResizing] = useState(false);
  const resizingDataRef = useRef({
    startX: 0,
    startY: 0,
    initialWidth: dimensions.width,
    initialHeight: dimensions.height,
  });

  // Center the terminal when the component mounts or window resizes
  useEffect(() => {
    const updatePosition = () => {
      if (terminalRef.current) {
        const { offsetWidth, offsetHeight } = terminalRef.current;
        setPosition({
          x: window.innerWidth / 2 - offsetWidth / 2,
          y: window.innerHeight / 2 - offsetHeight / 2,
        });
      }
    };
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  // Drag event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      }
      if (resizing) {
        const deltaX = e.clientX - resizingDataRef.current.startX;
        const deltaY = e.clientY - resizingDataRef.current.startY;
        setDimensions({
          width: Math.max(300, resizingDataRef.current.initialWidth + deltaX), // minimum width: 300px
          height: Math.max(200, resizingDataRef.current.initialHeight + deltaY), // minimum height: 200px
        });
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
      setResizing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, offset, resizing]);

  // Handle resizing start from the resize handle
  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // prevent dragging from starting
    setResizing(true);
    resizingDataRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialWidth: dimensions.width,
      initialHeight: dimensions.height,
    };
  };

  // Auto scroll the terminal body when logs change
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs]);

  // Handle commands
  const handleCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();

    // Clear command: reset the logs to the initial prompt.
    if (cmd === 'clear') {
      setLogs(initialLogs);
      return;
    }

    let response = '';

    switch (cmd) {
      case 'help':
        response =
          'Available commands: about, projects, contact, clear.\n' +
          '--------------------------------------------------------------------\n' +
          'about: Learn more about me!\n' +
          'projects: See all of my projects!\n' +
          'contact: See my contact information!\n' +
          'clear: Clear all the text in the terminal!\n' +
          'Use these commands to navigate through the different sections!';
        break;
      case 'about':
        response = 'About: I am a passionate developer with a knack for modern web design.';
        break;
      case 'projects':
        response = 'Projects: Here are some of my featured works...';
        break;
      case 'contact':
        response = 'Contact: email@example.com';
        break;
      default:
        response = `Command not recognized: ${command}`;
    }

    setLogs((prev) => [...prev, `> ${command}`, response]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div
      ref={terminalRef}
      className="terminal-window"
      style={{
        left: position.x,
        top: position.y,
        position: 'absolute',
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
    >
      <div className="terminal-header" onMouseDown={handleMouseDown}>
        <div className="header-title">Terminal</div>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
      <div className="terminal-body" ref={terminalBodyRef}>
        {logs.map((line, index) => (
          <div key={index} className="terminal-line">
            {line.split('\n').map((part, i) => {
              if (part.trim().startsWith('>')) {
                return (
                  <React.Fragment key={i}>
                    <span className="terminal-command">{part}</span>
                    <br />
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={i}>
                    {part}
                    <br />
                  </React.Fragment>
                );
              }
            })}
          </div>
        ))}
      </div>
      <div className="terminal-input">
        <span className="prompt">C:\&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          placeholder="Enter command..."
        />
      </div>
      <div className="resize-handle" onMouseDown={handleResizeMouseDown} />
    </div>
  );
};

export default Terminal;
