import React from "react";
import "./SearchBox";
import "./App.css";
import SearchBox from "./SearchBox";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="working-area">
          <SearchBox></SearchBox>
        </div>
      </div>
    );
  }
}

export default App;
