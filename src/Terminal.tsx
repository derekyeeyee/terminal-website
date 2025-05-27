import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';
import PopupWindow from './PopupWindow';

interface TerminalProps {
  onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const initialLogs = [
    'Welcome to My Portfolio!\n',
    'Type "help" for available commands.',
    'Feel free to drag me (the terminal) around or resize me for visibility :)\n',
  ];

  const [logs, setLogs] = useState<string[]>(initialLogs);
  const [input, setInput] = useState('');
  const [popups, setPopups] = useState<{ id: number; title: string; content: React.ReactNode }[]>([]);
  const [popupCounter, setPopupCounter] = useState(0);

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

  // Global highest z-index and terminal's z-index
  const [highestZ, setHighestZ] = useState(1);
  const [terminalZ, setTerminalZ] = useState(1);

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
        const newX = Math.min(
          Math.max(e.clientX - offset.x, 0),
          window.innerWidth - dimensions.width
        );
        const newY = Math.min(
          Math.max(e.clientY - offset.y, 0),
          window.innerHeight - dimensions.height
        );
        setPosition({ x: newX, y: newY });
      }
      if (resizing) {
        const deltaX = e.clientX - resizingDataRef.current.startX;
        const deltaY = e.clientY - resizingDataRef.current.startY;
        setDimensions({
          width: Math.max(300, resizingDataRef.current.initialWidth + deltaX), // minimum width: 300px
          height: Math.max(
            200,
            Math.min(600, resizingDataRef.current.initialHeight + deltaY)
          ), // minimum height: 200px, maximum height: 600px
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
  }, [dragging, offset, resizing, dimensions]);

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

  // When the main terminal is clicked, bring it to front.
  const bringTerminalToFront = () => {
    setHighestZ((prev) => {
      const newZ = prev + 1;
      setTerminalZ(newZ);
      return newZ;
    });
  };

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
          '\n' +
          'Available commands: about, projects, contact, clear.\n' +
          '--------------------------------------------------------------------\n' +
          'about: Learn more about me!\n' +
          'projects: See all of my projects!\n' +
          'contact: See my contact information!\n' +
          'clear: Clear all the text in the terminal!' +
          '\n--------------------------------------------------------------------\n' +
          'Use these commands to navigate through the different sections!\n';
        break;
      case 'about': {
        const id = popupCounter;
        // Assign popup a zIndex greater than the current highest.
        const newZ = highestZ + 1;
        setPopups((prev) => [
          ...prev,
          {
            id,
            title: 'About Me',
            content: (
              <>
                <h1>About Me</h1>
                <p>I am a passionate developer with experience in full-stack development. I specialize in building modern web applications using React, Node.js, and more.</p>
                <p>My interests include UI/UX design and creating dynamic user experiences.</p>
              </>
            ),
            zIndex: newZ,
          },
        ]);
        setPopupCounter((prev) => prev + 1);
        setHighestZ(newZ);
        response = 
        '\n' +
        'Opening About page...' +
        '\n';
        
        break;
      }
      case 'projects': {
        const id = popupCounter;
        const newZ = highestZ + 1;
        setPopups((prev) => [
          ...prev,
          {
            id,
            title: 'Projects',
            content: (
              <>
                <h1>Projects</h1>
                <p>Here are some featured projects:</p>
                <ul>
                  <li><strong>Project A</strong>: A web app for task management and productivity.</li>
                  <li><strong>Project B</strong>: An innovative solution for e-commerce platforms.</li>
                  <li><strong>Project C</strong>: A mobile-friendly social networking site.</li>
                </ul>
              </>
            ),
            zIndex: newZ,
          },
        ]);
        setPopupCounter((prev) => prev + 1);
        setHighestZ(newZ);
        response = 
        '\n' +
        'Opening Projects page...' +
        '\n';
        break;
      }
      case 'contact': {
        const id = popupCounter;
        const newZ = highestZ + 1;
        setPopups((prev) => [
          ...prev,
          {
            id,
            title: 'Contact',
            content: (
              <>
                <h1>Contact Me</h1>
                <p>Feel free to reach out via the following channels:</p>
                <ul>
                  <li>Email: <a href="mailto:email@example.com">email@example.com</a></li>
                  <li>LinkedIn: <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noreferrer">My LinkedIn</a></li>
                  <li>GitHub: <a href="https://github.com/yourprofile" target="_blank" rel="noreferrer">My GitHub</a></li>
                </ul>
              </>
            ),
            zIndex: newZ,
          },
        ]);
        setPopupCounter((prev) => prev + 1);
        setHighestZ(newZ);
        response = 
        '\n' +
        'Opening Contact page...' +
        '\n';
        break;
      }
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

  // Bring a popup to front when clicked.
  const bringPopupToFront = (id: number) => {
    setPopups((prev) => {
      const updated = prev.map((p) => {
        if (p.id === id) {
          const newZ = highestZ + 1;
          setHighestZ(newZ);
          return { ...p, zIndex: newZ };
        }
        return p;
      });
      return updated;
    });
  };

  return (
    <>
      <div
        ref={terminalRef}
        className="terminal-window"
        onMouseDown={bringTerminalToFront} // Bring terminal to front on click.
        style={{
          left: position.x,
          top: position.y,
          position: 'absolute',
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          zIndex: terminalZ, // set terminal's z-index
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

      {popups.map((popup) => (
        <PopupWindow
          key={popup.id}
          id={popup.id}
          title={popup.title}
          content={popup.content}
          zIndex={popup.zIndex} // pass the zIndex value
          onClose={() =>
            setPopups((prev) => prev.filter((p) => p.id !== popup.id))
          }
          onMouseDown={() => bringPopupToFront(popup.id)}
        />
      ))}
    </>
  );
};

export default Terminal;
