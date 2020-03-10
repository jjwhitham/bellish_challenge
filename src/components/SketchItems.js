import React from "react";

// Maps an array of buttons corresponding to each sketch.
// The current sketch is highlighted grey to identify it.
function SketchItems(props) {
  const currentSketchNum = props.currentSketchNum;
  const totalSketches = props.totalSketches;
  const SketchButtons = [...Array(totalSketches).keys()].map(sketchNumber => {
    const text = "Sketch #" + (sketchNumber + 1);
    let isCurrentSketch = sketchNumber === currentSketchNum;
    let style = { margin: "auto", display: "block" };
    if (isCurrentSketch) {
      style = {...style, background: "grey", color: "white" };
    }
    return (
      <button
        onClick={() => props.handleChangeSketch(sketchNumber)}
        key={sketchNumber}
        style={style}
      >
        {text}
      </button>
    );
  });

  return <div> {SketchButtons} </div>;
}

export default SketchItems;
