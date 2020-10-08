import React from "react";
import "./SearchResult.css";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.handleSearchResultClick = this.handleSearchResultClick.bind(this);
    this.handleMouseOverHighlight = this.handleMouseOverHighlight.bind(this);
  }

  componentDidUpdate() {
    if (this.myRef.current && this.props.highlighted === true) {
      this.myRef.current.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
    }
  }

  handleSearchResultClick(event) {
    this.props.onSearchResultClick(this.props.countryObject);
  }

  handleMouseOverHighlight(event) {
    this.props.onMouseOverHighlight(this.props.index);
  }

  render() {
    return (
      <div
        className={this.props.highlighted === true ? "search-result hover" : "search-result"}
        ref={this.myRef}
        onMouseOver={this.handleMouseOverHighlight}
      >
        <p onClick={this.handleSearchResultClick} className="search-result-text">
          {this.props.countryObject.country}
        </p>
      </div>
    );
  }
}

export default SearchResult;
