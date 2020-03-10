import React, { useState, useRef, useEffect } from "react";

// Sketching area component.
function SketchDrawing(props) {
  const [paths, setPaths] = useState([]);
  const canvasRef = useRef();

  // Constrain canvas dimensions
  const btnsFlexContainerWidth = 130;
  const browserHeaderHeight = 30;

  // Saves state onMouseUp
  const handleMouseUp = path => {
    const currentSketchNum = props.currentSketchNum;
    const updatedPaths = paths.slice();
    updatedPaths[currentSketchNum] = new Path2D(path);
    setPaths(updatedPaths);
  };

  // Clears the canvas of paths
  const cleanupCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, window.innerWidth - btnsFlexContainerWidth, window.innerHeight - browserHeaderHeight);
  };

  // Initialises a new drawing, or loads an existing drawing
  const initCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const currentSketchNum = props.currentSketchNum;
    const newDrawing = currentSketchNum >= paths.length;

    let path = new Path2D();
    let isDrawing = false;

    context.strokeStyle = "orange";
    context.lineWidth = 5;

    // Loads an existing drawing
    if (!newDrawing) {
      const oldPath = paths[currentSketchNum];
      path = new Path2D(oldPath);
      context.stroke(path);
    }

    // Starts a subpath at new coords or connects subpaths when drawing
    const draw = e => {
      const x = e.pageX - canvas.offsetLeft;
      const y = e.pageY - canvas.offsetTop;
      if (!isDrawing) {
        path.moveTo(x, y);
      } else {
        path.lineTo(x, y);
        context.stroke(path);
      }
    };

    // On mousedown, begins drawing
    canvas.onmousedown = function(e) {
      draw(e);
      isDrawing = true;
    };

    // On mousemove, draws if enabled
    canvas.onmousemove = function(e) {
      if (!isDrawing) {
        return;
      }
      draw(e);
    };

    // On mouseup, stops drawing and saves state
    canvas.onmouseup = function(e) {
      isDrawing = false;
      handleMouseUp(path);
    };
  };

  // useEffect replaces previously used lifecycle methods, implementing
  // the same functionality, namely:
  // componentDidMount():
  //    Initialises new drawing on component mount
  // componentWillUpdate():
  //    When the current sketch changes, wipe the canvas and
  //    either start fresh for a new drawing, or load existing drawing
  useEffect(() => {
    cleanupCanvas();
    initCanvas();
  });

  
  return (
    <div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth - btnsFlexContainerWidth}
        height={window.innerHeight - browserHeaderHeight}
      />
    </div>
  );
}

export default SketchDrawing;
