import React from "react";
import SearchResult from "./SearchResult";
import "./SearchResultsBox.css";

class SearchResultsBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var height = 0;
    return (
      <div id="search-results-box" ref={this.searchResultsBoxRef}>
        {this.props.countriesMatched.map(function (countryObject) {
          return <SearchResult key={countryObject.country} countryName={countryObject.country}></SearchResult>;
        })}
      </div>
    );
  }
}

export default SearchResultsBox;
