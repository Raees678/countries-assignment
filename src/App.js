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
  }

  handleSearchTextChange(searchText) {
    this.setState({
      searchText: searchText,
    });
  }

  getCountriesMatched() {
    if (this.state.searchText !== "") {
      var newThis = this;
      return this.countries.filter(function (countryObject) {
        return countryObject.country.includes(newThis.state.searchText);
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
