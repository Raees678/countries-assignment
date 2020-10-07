import React from "react";
import "./SearchResult.css";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchResultClick = this.handleSearchResultClick.bind(this);
  }

  handleSearchResultClick(event) {
    this.props.onSearchResultClick(this.props.countryObject);
  }

  render() {
    return (
      <div className="search-result">
        <p onClick={this.handleSearchResultClick} className="search-result-text">
          {this.props.countryObject.country}
        </p>
      </div>
    );
  }
}

export default SearchResult;
