import React, { Component } from "react";
// Sketching area component.
export class SketchDrawing extends Component {
  state = {
    paths: [null]
  };

  // Saves state onMouseUp
  handleMouseUp = path => {
    const currentSketchNum = this.props.currentSketchNum;
    const updatedPaths = this.state.paths.slice();
    updatedPaths[currentSketchNum] = new Path2D(path);
    this.setState({
      paths: updatedPaths
    });
  };

  // Clears the canvas of paths
  cleanupCanvas = () => {
    const canvas = this.refs.canvas;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }

  // Initialises a new drawing, or loads an existing drawing
  initCanvas = () => {
    const canvas = this.refs.canvas;
    const context = canvas.getContext("2d");
    const handleMouseUp = this.handleMouseUp;
    const currentSketchNum = this.props.currentSketchNum;
    const newDrawing = currentSketchNum >= this.state.paths.length;
    const paths = this.state.paths.slice();

    let path = new Path2D();
    let isDrawing = false;

    context.strokeStyle = "orange";
    context.lineWidth = 5;

    // Creates a new Path2D object for a new drawing, or loads an existing drawing
    if (newDrawing) {
      this.setState({
        paths: paths.concat([null])
      });
    } else {
      const oldPath = this.state.paths[currentSketchNum];
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
  }

  // Initialises new drawing on component mount
  componentDidMount = () => {
    this.initCanvas();
  }
  // When the current sketch changes, wipe the canvas and
  // either start fresh, or load existing drawing
  componentDidUpdate = prevProps => {
    if (prevProps.currentSketchNum !== this.props.currentSketchNum) {
      this.cleanupCanvas();
      this.initCanvas();
    }
  }

  render() {
    return (
      <div>
        <canvas
          ref="canvas"
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
    );
  }
}

export default SketchDrawing;
