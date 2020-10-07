import React from "react";
import SearchResult from "./SearchResult";
import "./SearchResultsBox.css";

class SearchResultsBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="search-results-box">
        {this.props.countriesMatched.map(function (countryObject) {
          return <SearchResult key={countryObject.country} countryName={countryObject.country}></SearchResult>;
        })}
      </div>
    );
  }
}

export default SearchResultsBox;
