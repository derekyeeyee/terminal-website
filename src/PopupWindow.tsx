import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css';

interface PopupWindowProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

const PopupWindow: React.FC<PopupWindowProps> = ({ title, content, onClose }) => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 300, y: window.innerHeight / 2 - 200 });
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
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        });
      }
      if (resizing) {
        const deltaX = e.clientX - resizingRef.current.startX;
        const deltaY = e.clientY - resizingRef.current.startY;
        setDimensions({
          width: Math.max(300, resizingRef.current.initialWidth + deltaX),
          height: Math.max(200, resizingRef.current.initialHeight + deltaY),
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
  }, [dragging, resizing]);

  return (
    <div
      className="terminal-window popup-window"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
    >
      <div className="terminal-header" onMouseDown={handleDragMouseDown}>
        <div className="header-title">{title}</div>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
      <div className="terminal-body">
        {content}
      </div>
      <div className="resize-handle" onMouseDown={handleResizeMouseDown} />
    </div>
  );
};

export default PopupWindow;