import React from "react";
import SearchResult from "./SearchResult";
import "./SearchResultsBox.css";

class SearchResultsBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightedSearchResultIndex: 0,
      height: null,
    };
    this.searchResultRef = React.createRef();
  }

  // renders a list of searchResults
  // a highlighted property is used to indicate that a given SearchResult must be highlighted
  // if a SearchResult has the same index as the highlightedCountryMatched, then highlighted is true and the given  SearchResult is highlighted
  // occasionally a SearchResult may want to add the highlighted class to itself when it ismoused over
  // so we also pass to the SearchResult object its index in the list of countries being rendered
  // that way it may call a function in App.js and set the state of the highlightedCountryMatched which decides which country is  highlighted
  render() {
    return (
      <div id="search-results-box" style={{ maxHeight: this.state.height }}>
        {this.props.countriesMatched.map(function (countryObject, index) {
          return (
            <div key={index}>
              <SearchResult
                onSearchResultClick={this.props.onSearchResultClick}
                highlighted={this.props.highlightedCoutryMatched === index}
                index={index}
                countryObject={countryObject}
                onMouseOverHighlight={this.props.onMouseOverHighlight}
              ></SearchResult>
              {index === this.props.countriesMatched.length - 1 && (
                <div key="search-results-count" id="results-footer">
                  {this.props.countriesMatched.length} results found
                </div>
              )}
            </div>
          );
        }, this)}
      </div>
    );
  }
}

export default SearchResultsBox;
