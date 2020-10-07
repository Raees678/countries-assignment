import React from "react";
import SearchResult from "./SearchResult";
import "./SearchResultsBox.css";

class SearchResultsBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var height = 0;

    if (this.props.countriesMatchedLoading === true) {
      return (
        <div id="search-results-box" ref={this.searchResultsBoxRef}>
          <div className="spinner"></div>
        </div>
      );
    } else {
      return (
        <div id="search-results-box" ref={this.searchResultsBoxRef}>
          {this.props.countriesMatched.map(function (countryObject) {
            return (
              <SearchResult
                onSearchResultClick={this.props.onSearchResultClick}
                key={countryObject.country}
                countryObject={countryObject}
              ></SearchResult>
            );
          }, this)}
        </div>
      );
    }
  }
}

export default SearchResultsBox;
