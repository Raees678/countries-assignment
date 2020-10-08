import React from "react";
import "./SearchResult.css";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.searchResultRef = React.createRef();
    this.handleSearchResultClick = this.handleSearchResultClick.bind(this);
    this.handleMouseOverHighlight = this.handleMouseOverHighlight.bind(this);
  }

  componentDidUpdate() {
    if (this.searchResultRef.current && this.props.highlighted === true) {
      this.searchResultRef.current.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
    }
  }

  handleSearchResultClick(event) {
    this.props.onSearchResultClick(this.props.countryObject);
  }

  handleMouseOverHighlight(event) {
    console.log("mouse over search-result");
    this.props.onMouseOverHighlight(this.props.index);
  }

  render() {
    return (
      <div
        className={this.props.highlighted === true ? "search-result hover" : "search-result"}
        ref={this.searchResultRef}
        onMouseOver={this.handleMouseOverHighlight}
        onClick={this.handleSearchResultClick}
      >
        <p className="search-result-text">{this.props.countryObject.country}</p>
      </div>
    );
  }
}

export default SearchResult;
