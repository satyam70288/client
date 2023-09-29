import React, { useState, useRef } from 'react';
import './App.css';
import DraggableBox from './components/DragableBox';

function ResizableDiv({ left, top, width, height }) {
  const [isResizing, setIsResizing] = useState(false);

  const containerRef = useRef(null);

  const handleMouseDown = () => {
    setIsResizing(false);
  };

  return (
    <div
      ref={containerRef}
      className={`resizable-container ${isResizing ? 'resizing' : ''}`}
      style={{ width: width + 'px', height: height + 'px', left: left + 'px', top: top + 'px' }}
      onMouseDown={handleMouseDown}
    >
      <div className="resizable-content">
        Resizable Div
      </div>
    </div>
  );
}

function App() {
  const [divs, setDivs] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragEnd, setDragEnd] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragEnd({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setDragEnd({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    if (dragging) {
      setDragging(false);

      const newWidth = Math.abs(dragEnd.x - dragStart.x);
      const newHeight = Math.abs(dragEnd.y - dragStart.y);

      const newLeft = Math.min(dragStart.x, dragEnd.x);
      const newTop = Math.min(dragStart.y, dragEnd.y);

      const newDiv = (
        <ResizableDiv
          key={divs.length}
          left={newLeft}
          top={newTop}
          width={newWidth}
          height={newHeight}
        />
      );

      setDivs([...divs, newDiv]);
    }
  };

  return (
    <div
      className="App"
      draggable="true"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* <DraggableBox onClick={divs}/> */}
      {divs}
    </div>
  );
}

export default App;
