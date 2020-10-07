import React from "react";
import "./App.css";
import SearchBox from "./SearchBox";
import SearchResultsBox from "./SearchResultsBox";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };

    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.getCountriesMatched = this.getCountriesMatched.bind(this);
    this.countries = require("../node_modules/country-json/src/country-by-capital-city.json");
    this.rateLimited = false;
    this.updatedStringDuringRateLimit = null;
  }

  handleSearchTextChange(searchText) {
    if (this.rateLimited === false) {
      this.rateLimited = true;
      var newThis = this;
      setTimeout(function () {
        newThis.rateLimited = false;
        if (newThis.updatedStringDuringRateLimit !== null) {
          const updatedString = newThis.updatedStringDuringRateLimit;
          newThis.updatedStringDuringRateLimit = null;
          newThis.handleSearchTextChange(updatedString);
        }
      }, 1000);
      this.setState({
        searchText: searchText,
      });
    } else {
      this.updatedStringDuringRateLimit = searchText;
    }
  }

  getCountriesMatched() {
    if (this.state.searchText !== "") {
      var newThis = this;
      return this.countries.filter(function (countryObject) {
        return countryObject.country.toLowerCase().includes(newThis.state.searchText.toLowerCase());
      });
    } else {
      return [];
    }
  }

  render() {
    return (
      <div className="App">
        <div className="working-area">
          <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap" rel="stylesheet" />
          <div id="title">Country Search</div>
          <SearchBox searchText={this.state.searchText} onSearchTextChange={this.handleSearchTextChange}></SearchBox>
          <SearchResultsBox countriesMatched={this.getCountriesMatched()}></SearchResultsBox>
        </div>
      </div>
    );
  }
}

export default App;
