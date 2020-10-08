import React from "react";
import "./SearchResult.css";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.searchResultRef = React.createRef();
    this.handleSearchResultClick = this.handleSearchResultClick.bind(this);
    this.handleMouseOverHighlight = this.handleMouseOverHighlight.bind(this);
  }

  // gets the HTML element for the given component using a React Ref,
  //  then scrolls to the component if it is highlighted during an update
  componentDidUpdate() {
    if (this.searchResultRef.current && this.props.highlighted === true) {
      this.searchResultRef.current.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
    }
  }

  // calls the onSearchResultClick method in app.js, which toggles some state with the given countryObject
  // this is passed to some modal that then displays its name and capital
  handleSearchResultClick(event) {
    this.props.onSearchResultClick(this.props.countryObject);
  }

  // when the mouse is over a component the index is passed to App.js so that it knows which matchedCountry needs to be highlighted
  //this index is recieved as a prop from the parent SearchResultsBox component when it renders a SearchResult, so it is guaranteed to always point to a valid searchResult
  handleMouseOverHighlight(event) {
    this.props.onMouseOverHighlight(this.props.index);
  }

  // renders a search result
  // each SearchResult component has an attatched ref to it
  // the ref is used as React's alternative to Document.getElementByID
  // so that in the componentDidUpdate the HTML element can be obtained since it needs to be scrolled to if it is a highlighted component
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
