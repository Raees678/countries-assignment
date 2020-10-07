import React from "react";
import "./SearchResult.css";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="search-result">
        <p className="search-result-text">{this.props.countryName}</p>
      </div>
    );
  }
}

export default SearchResult;
