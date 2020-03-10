import React, { useState } from "react";
import SketchItems from "./components/SketchItems";
import SketchDrawing from "./components/SketchDrawing";
import "./App.css";

// App is the main SketchBook component.

// If extending this application to incorporate server-side syncing
// we might like to lean on a requests library, like Axios, for making
// HTML GET, POST, PUT & DELETE requests to our backend. Although the
// native Fetch API or XHR would also work.
//
// E.g. for loading the drawing paths from a user's account, we would make a
// GET request through one of our backend routes, and perhaps do some
// error handling based on the server's response. We might use Node & Express
// on the backend and deliver the body of the response as JSON data, making
// it convenient to work with JavaScript objects in both back and front ends.
// Using a cloud database solution like MongoDB, with Mongoose as a driver,
// we can also leverage off a JSON representation of our data, simplifying the
// development process.
//
// The 'componentDidMount' lifecycle method of SketchDrawing would be a good
// place to make a GET request to bring in our user's data. Likewise,
// 'componentDidUnmount'/'componentDidUpdate' would be convenient places to make
// POST requests to store their sketches. A 'save sketch' button could be added,
// which would trigger a POST request for a new sketch, or a PUT request for an
// existing sketch upon clicking save.
function App() {
  let [currentSketchNum, setCurrentSketchNum] = useState(0);
  let [totalSketches, setTotalSketches] = useState(1);

  // Set the current sketch number
  const goToSketch = sketchNum => {
    setCurrentSketchNum(sketchNum);
  };

  // When adding a new sketch, update the total and go to new sketch
  const handleNewSketch = () => {
    goToSketch(totalSketches);
    totalSketches += 1;
    setTotalSketches(totalSketches);
  };

  // Jump to a different existing sketch
  const handleChangeSketch = sketchNum => {
    if (sketchNum === currentSketchNum) {
      return;
    }
    goToSketch(sketchNum);
  };

  return (
    <div className="App">
      <div className="button-flex-container">
        <button style={{ display: "block" }} onClick={handleNewSketch}>
          + Add New Sketch
        </button>
        <div id="sketch-items" style={{ paddingTop: "20px" }}>
          <SketchItems
            handleChangeSketch={i => handleChangeSketch(i)}
            currentSketchNum={currentSketchNum}
            totalSketches={totalSketches}
          />
        </div>
      </div>
      <div id="sketch-drawing">
        <SketchDrawing currentSketchNum={currentSketchNum} />
      </div>
    </div>
  );
}

export default App;
