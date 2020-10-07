import React from "react";
import "./SearchBox.css";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleSearchTextChange(event) {
    this.props.onSearchTextChange(event.target.value);
  }

  render() {
    return (
      <div id="search-box">
        <form autoComplete="off" id="search-box-form-div">
          <input autoComplete="false" name="hidden" type="text" style={{ display: "none" }}></input>
          <input
            id="search-box-form-div-input"
            placeholder="Enter a country to get started"
            onChange={this.handleSearchTextChange}
          ></input>
        </form>
      </div>
    );
  }
}

export default SearchBox;
