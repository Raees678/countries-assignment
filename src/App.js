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

  // when the search text is changed in the SearchBar component, this method is called
  // it sets a timeout that is equal to the class variable rateLimit before updating the state with the new search text
  //  if any previous search text was to be updated but hasnt yet because its timeout hasnt finished the earlier timeout is also cleared
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

  // when a search result is clicked the showingModal state variable is set to  true
  // the modalCountryObject state variable is set to the countryObject i.e. (country, city) that is clicked
  // that modalCountryObject is passed as a prop later to the Modal
  handleSearchResultClick(countryObject) {
    this.setState({
      showingModal: true,
      modalCountryObject: countryObject,
    });
  }

  // when a close button on the modal is clicked, the showingModal state is set to false, and the modalCOuntryObject is also removed to clean up the state
  handleCloseButtonClick() {
    this.setState({
      showingModal: false,
      modalCountryObject: null,
    });
  }

  // if a keyDown event occurs when the App component is the component to recieve it
  // it checks if the keycode is for arrowkey up or arrowkey down
  // if it is for any of them it updates the highlightedCountryMatched state variable
  // the highlightedCountryMatched state variable is an index into the countriesMatched state variable
  // it is passed in to the SearchResultsBox and subsequenty to the SearchResults component to allow for CSS highlighting on the given country
  // the effect is that the arrow keys update the highlightedCountry
  // the index is ensured to always be in sync with the countriesMatched array so now out of bounds bugs occur
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

  // when a mosueover event occurs within a SearchResult, this function updates the index of the highlightedCountryMatched state variable
  // it is provided the index by the SearchResult component; The SearchResult component knows its index and when a mouseOver event occurs it provides it here
  // this is needed to update the state
  handleMouseOverHighlight(index) {
    this.setState({
      highlightedCoutryMatched: index,
    });
  }

  // this method filters the array of countries and finds the countries that match the given searchText variable.
  // it also sorts the countries in their most relevant ordering such that the ones at the top are those that have the search text
  // at the start of their name and the ones at the bottom are those that have the search text at the end of their name
  // this allows for more relevant search results than a simple alphabetical ordering

  // this method also implements a delay using setTimeout to simulate an API delay
  // if a new call to the method is made before the results can be obtained the previous delay is cleared and a new delay is started
  // it also updates the countriesMatchedLoading state variable that is used within the SearchBox to show a spinner if the countries are loading
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

  // this sets the ratelimit timer when the slider value changes
  // low values mean the state will update more frequently when typing
  // high values mean the state will update less frequently when typing
  handleRateLimitChange(event) {
    this.rateLimit = event.target.value;
  }

  // this sets the search delay i.e. the simulated API delay when matching countries
  // low values are a lower delay, high values are a higher delay in obtaining a list of countries that match
  handleSearchDelayChange(event) {
    this.searchDelay = event.target.value;
  }

  // this updates a state variable that shows the sliders for tuning the rateLimit and searchDelay
  // when the settings button is clicked, this is called to toggle the state and show the sliders
  // and when clicked again the sliders are hidden
  handleShowingSettingsChange() {
    this.setState({
      showingSettings: !this.state.showingSettings,
    });
  }

  // page structure rendering:
  //            title
  //            searchBar (and spinner alongside it)
  //            searchResultsBox(can be hidden if no search term or empty search term)
  //            sliders(can be hidden if settings buttton not clicked)
  //            settings button
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
