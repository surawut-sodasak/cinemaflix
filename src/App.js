import React, { Component } from "react";
import Router from "./Components/Router";
import "./App.css";


class App extends Component {
  constructor(props) {
    super(props);
    console.log("APP-Page");
  }

  render() {
    return (
      <div className="App">        
        { Router }
      </div>
    );
  }
}

export default App;