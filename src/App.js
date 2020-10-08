import React from "react";
import "./App.css";
import Modal from "./Modal";
import SearchBox from "./SearchBox";
import SearchResultsBox from "./SearchResultsBox";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      width: window.innerWidth,
      searchText: "",
      countriesMatched: [],
      countriesMatchedLoading: false,
      highlightedCoutryMatched: null,
      showingModal: false,
      modalCountryObject: null,
      showingSettings: false,
    };

    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSearchResultClick = this.handleSearchResultClick.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
    this.getCountriesMatched = this.getCountriesMatched.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseOverHighlight = this.handleMouseOverHighlight.bind(this);
    this.handleRateLimitChange = this.handleRateLimitChange.bind(this);
    this.handleSearchDelayChange = this.handleSearchDelayChange.bind(this);
    this.handleShowingSettingsChange = this.handleShowingSettingsChange.bind(this);

    this.countries = require("../node_modules/country-json/src/country-by-capital-city.json");
    this.rateLimit = 1000;
    this.rateLimited = false;
    this.rateLimitCallback = null;
    this.searchDelay = 1000;
    this.searchDelayCallback = null;
  }

  handleSearchTextChange(searchText) {
    clearTimeout(this.rateLimitCallback);
    this.rateLimited = true;
    var newThis = this;
    this.rateLimitCallback = setTimeout(function () {
      newThis.setState({
        searchText: searchText,
      });
      newThis.getCountriesMatched(searchText);
      newThis.rateLimited = false;
    }, this.rateLimit);
  }

  handleSearchResultClick(countryObject) {
    this.setState({
      showingModal: true,
      modalCountryObject: countryObject,
    });
  }

  handleCloseButtonClick() {
    this.setState({
      showingModal: false,
      modalCountryObject: null,
    });
  }

  handleKeyDown(event) {
    if (event.keyCode === 38) {
      if (this.state.highlightedCoutryMatched !== null) {
        let newHighlightedCountryMatched =
          this.state.highlightedCoutryMatched - 1 >= 0
            ? this.state.highlightedCoutryMatched - 1
            : this.state.highlightedCoutryMatched;
        this.setState({
          highlightedCoutryMatched: newHighlightedCountryMatched,
        });
      }
    } else if (event.keyCode === 40) {
      if (this.state.highlightedCoutryMatched !== null) {
        let newHighlightedCountryMatched =
          this.state.highlightedCoutryMatched + 1 < this.state.countriesMatched.length
            ? this.state.highlightedCoutryMatched + 1
            : this.state.highlightedCoutryMatched;
        this.setState({
          highlightedCoutryMatched: newHighlightedCountryMatched,
        });
      }
    }
  }

  handleMouseOverHighlight(index) {
    this.setState({
      highlightedCoutryMatched: index,
    });
  }

  getCountriesMatched(searchText) {
    this.setState({
      countriesMatched: [],
      countriesMatchedLoading: true,
      highlightedCoutryMatched: null,
    });
    clearTimeout(this.searchDelayCallback);

    var newThis = this;
    this.searchDelayCallback = setTimeout(function () {
      if (searchText !== "") {
        let countriesMatched = newThis.countries.filter(function (countryObject) {
          return countryObject.country.toLowerCase().includes(searchText.toLowerCase());
        });

        countriesMatched.sort(function (a, b) {
          let sortValue =
            a.country.toLowerCase().indexOf(searchText.toLowerCase()) -
            b.country.toLowerCase().indexOf(searchText.toLowerCase());

          if (sortValue === 0) {
            return a.country.localeCompare(b.country);
          } else {
            return sortValue;
          }
        });

        newThis.setState({
          countriesMatched: countriesMatched,
          countriesMatchedLoading: false,
          highlightedCoutryMatched: 0,
        });
      } else {
        newThis.setState({
          countriesMatched: [],
          countriesMatchedLoading: false,
          highlightedCoutryMatched: null,
        });
      }
    }, this.searchDelay);
  }

  handleRateLimitChange(event) {
    this.rateLimit = event.target.value;
  }

  handleSearchDelayChange(event) {
    this.searchDelay = event.target.value;
  }

  handleShowingSettingsChange() {
    this.setState({
      showingSettings: !this.state.showingSettings,
    });
  }

  render() {
    return (
      <div className="App" onKeyDown={this.handleKeyDown} tabIndex="1">
        <div className="working-area">
          <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap" rel="stylesheet" />
          <div id="title">Country Search</div>
          <SearchBox
            countriesMatchedLoading={this.state.countriesMatchedLoading}
            searchText={this.state.searchText}
            onSearchTextChange={this.handleSearchTextChange}
          ></SearchBox>
          <div className="clearing-div"></div>
          <SearchResultsBox
            onSearchResultClick={this.handleSearchResultClick}
            countriesMatchedLoading={this.state.countriesMatchedLoading}
            countriesMatched={this.state.countriesMatched}
            highlightedCoutryMatched={this.state.highlightedCoutryMatched}
            onMouseOverHighlight={this.handleMouseOverHighlight}
          ></SearchResultsBox>
        </div>
        <div className="easter-egg">
          {this.state.showingSettings && (
            <div>
              <div className="slidecontainer">
                <label htmlFor="rate_limit_range">Rate Limit Range</label>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  defaultValue="1000"
                  className="slider"
                  id="rate_limit_range"
                  onChange={this.handleRateLimitChange}
                ></input>
                <label htmlFor="search_delay_range">Search Delay Range</label>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  defaultValue="1000"
                  className="slider"
                  id="search_delay_range"
                  onChange={this.handleSearchDelayChange}
                ></input>
              </div>
              <div className="slidecontainer"></div>
            </div>
          )}
          <span role="img" aria-label="easter-egg" onClick={this.handleShowingSettingsChange}>
            ⚙️
          </span>
        </div>

        {this.state.showingModal === true && (
          <Modal countryObject={this.state.modalCountryObject} onCloseButtonClick={this.handleCloseButtonClick}></Modal>
        )}
      </div>
    );
  }
}

export default App;
