import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css';

interface PopupWindowProps {
  id: number;
  title: string;
  content: React.ReactNode;
  zIndex: number;
  onClose: () => void;
  onMouseDown: () => void;
}

const PopupWindow: React.FC<PopupWindowProps> = ({ title, content, zIndex, onClose, onMouseDown }) => {
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 300,
    y: window.innerHeight / 2 - 200,
  });
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizingRef = useRef({
    startX: 0,
    startY: 0,
    initialWidth: dimensions.width,
    initialHeight: dimensions.height,
  });

  const handleDragMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setResizing(true);
    resizingRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialWidth: dimensions.width,
      initialHeight: dimensions.height,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        const newX = Math.min(
          Math.max(e.clientX - dragOffset.current.x, 0),
          window.innerWidth - dimensions.width
        );
        const newY = Math.min(
          Math.max(e.clientY - dragOffset.current.y, 0),
          window.innerHeight - dimensions.height
        );
        setPosition({ x: newX, y: newY });
      }
      if (resizing) {
        const deltaX = e.clientX - resizingRef.current.startX;
        const deltaY = e.clientY - resizingRef.current.startY;
        const newWidth = Math.max(300, resizingRef.current.initialWidth + deltaX);
        const newHeight = Math.max(
          200,
          Math.min(600, resizingRef.current.initialHeight + deltaY) // Limit max height to 600px
        );
        // Optionally, also ensure the popup doesn't go off-screen:
        const clampedWidth = Math.min(newWidth, window.innerWidth - position.x);
        const clampedHeight = Math.min(newHeight, window.innerHeight - position.y);
        setDimensions({
          width: clampedWidth,
          height: clampedHeight,
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
  }, [dragging, resizing, dimensions, position]);

  return (
    <div
      className="terminal-window popup-window"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        zIndex, // use the passed in zIndex
      }}
      onMouseDown={onMouseDown} // Bring to front when clicked.
    >
      <div className="terminal-header" onMouseDown={handleDragMouseDown}>
        <div className="header-title">{title}</div>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
      <div className="terminal-body">
        {content}
      </div>
      <div className="resize-handle" onMouseDown={handleResizeMouseDown} />
    </div>
  );
};

export default PopupWindow;