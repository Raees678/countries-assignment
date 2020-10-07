import React from "react";
import "./SearchBox.css";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="search-box">
        <form id="search-box-form-div">
          <input id="search-box-form-div-input" placeholder="Enter a country to get started"></input>
        </form>
      </div>
    );
  }
}

export default SearchBox;
