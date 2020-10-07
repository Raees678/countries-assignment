import React from "react";
import "./Modal.css";

class Modal extends React.Component {
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
    }
    return (
      <div id="search-results-box" ref={this.searchResultsBoxRef}>
        {this.props.countriesMatched.map(function (countryObject) {
          return <SearchResult key={countryObject.country} countryName={countryObject.country}></SearchResult>;
        })}
      </div>
    );
  }
}

export default Modal;
