import React from "react";

function SketchNew(props) {
  return (
    <div>
      <button
        className="sketch-new-btn"
        style={{ margin: "auto", display: "block" }}
        onClick={props.handleNewSketch}
      >
        + Add New Sketch
      </button>
    </div>
  );
}

export default SketchNew;
