import React from "react";
import SearchResult from "./SearchResult";
import "./SearchResultsBox.css";

class SearchResultsBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightedSearchResultIndex: 0,
    };
  }

  render() {
    var height = 0;

    if (this.props.countriesMatchedLoading === true) {
      return (
        <div id="search-results-box">
          <div className="spinner"></div>
        </div>
      );
    } else {
      return (
        <div id="search-results-box">
          {this.props.countriesMatched.map(function (countryObject, index) {
            return (
              <div>
                <SearchResult
                  onSearchResultClick={this.props.onSearchResultClick}
                  highlighted={this.props.highlightedCoutryMatched === index}
                  key={index}
                  index={index}
                  countryObject={countryObject}
                  onMouseOverHighlight={this.props.onMouseOverHighlight}
                ></SearchResult>
                {index === this.props.countriesMatched.length - 1 && (
                  <div id="results-footer">{this.props.countriesMatched.length} results found</div>
                )}
              </div>
            );
          }, this)}
        </div>
      );
    }
  }
}

export default SearchResultsBox;
