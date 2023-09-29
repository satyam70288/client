// import React, { useState } from 'react';
// import './App.css';
// function ResizableDiv({ left, top, width, height }) {
//   return (
//     <div
//       className="resizable-container"
//       style={{ width: width + 'px', height: height + 'px', left: left + 'px', top: top + 'px' }}
//     >
//       <div className="resizable-content">
//         Resizable Div
//       </div>
//     </div>
//   );
// }

// function App() {
//   const [divs, setDivs] = useState([]);
//   const [isCreatingDiv, setIsCreatingDiv] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const [dragEnd, setDragEnd] = useState({ x: 0, y: 0 });

//   const handleMouseDown = (e) => {
//     setIsCreatingDiv(true);
//     setDragStart({ x: e.clientX, y: e.clientY });
//     setDragEnd({ x: e.clientX, y: e.clientY });

//     // Create a new div immediately upon clicking and dragging.
//     const newDiv = {
//       left: e.clientX,
//       top: e.clientY,
//       width: 0,
//       height: 0,
//     };

//     setDivs([...divs, newDiv]);
//   };

//   const handleMouseMove = (e) => {
//     if (isCreatingDiv) {
//       setDragEnd({ x: e.clientX, y: e.clientY });

//       // Update the size of the last created div during the drag.
//       const updatedDivs = [...divs];
//       const lastIndex = updatedDivs.length - 1;
//       const newWidth = Math.abs(e.clientX - dragStart.x);
//       const newHeight = Math.abs(e.clientY - dragStart.y);

//       updatedDivs[lastIndex].width = newWidth;
//       updatedDivs[lastIndex].height = newHeight;

//       setDivs(updatedDivs);
//     }
//   };

//   const handleMouseUp = () => {
//     setIsCreatingDiv(false);
//   };

//   return (
//     <div
//       className="App"
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//     >
//       {divs.map((div, index) => (
//         <ResizableDiv
//           key={index}
//           left={div.left}
//           top={div.top}
//           width={div.width}
//           height={div.height}
//         />
//       ))}
//     </div>
//   );
// }

// export default App;
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
  const [divs, setDivs] = useState(null);
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
          key={divs}
          left={newLeft}
          top={newTop}
          width={newWidth}
          height={newHeight}
        />
      );

      setDivs(newDiv);
    }
  };

  return (
    <div
      className="App"
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

