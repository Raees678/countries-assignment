import React from "react";
import "./SearchBox";
import "./App.css";
import SearchBox from "./SearchBox";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };

    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleSearchTextChange(searchText) {
    this.setState({
      searchText: searchText,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="working-area">
          <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap" rel="stylesheet" />

          <div id="title">Country Search</div>
          <SearchBox searchText={this.state.searchText} onSearchTextChange={this.handleSearchTextChange}></SearchBox>
          <div>{this.state.searchText}</div>
        </div>
      </div>
    );
  }
}

export default App;
