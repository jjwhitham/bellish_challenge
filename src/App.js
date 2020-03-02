import React, { Component } from "react";
import SketchNew from "./components/SketchNew";
import SketchItems from "./components/SketchItems";
import SketchDrawing from "./components/SketchDrawing";
import "./App.css";

// App is the main SketchBook component and.

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
class App extends Component {
  state = {
    currentSketchNum: 0,
    totalSketches: 1
  };

  // Set the current sketch number
  goToSketch = sketchNum => {
    this.setState({
      currentSketchNum: sketchNum
    });
  }

  // When adding a new sketch, update the total and go to new sketch
  handleNewSketch = () => {
    console.log("handle new sketch being called...")
    let totalSketches = this.state.totalSketches;

    this.goToSketch(totalSketches);
    totalSketches += 1;
    this.setState({
      totalSketches: totalSketches
    });
  }

  // Jump to a different existing sketch
  handleChangeSketch = sketchNum => {
    if (sketchNum === this.state.currentSketchNum) {
      return;
    }
    this.goToSketch(sketchNum);
  }

  render() {
   
    return (
      <div className="App">
        <div className="grid-container">
          <div className="grid-item" id="sketch-new">
            <SketchNew
              handleNewSketch={() => this.handleNewSketch()}
            />
          </div>
          <div className="grid-item" id="sketch-items">
            <SketchItems
              handleChangeSketch={(i) => this.handleChangeSketch(i)}
              currentSketchNum={this.state.currentSketchNum}
              totalSketches={this.state.totalSketches}
            />
          </div>
          <div className="grid-item" id="sketch-drawing">
            <SketchDrawing
              currentSketchNum={this.state.currentSketchNum}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
