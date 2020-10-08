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

  render() {
    if (this.props.countriesMatchedLoading === true) {
      return (
        <div id="search-results-box">
          <div className="spinner"></div>
        </div>
      );
    } else {
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
}

export default SearchResultsBox;
