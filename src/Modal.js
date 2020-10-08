import React from "react";
import "./Modal.css";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
  }

  // call the close button clicked function in App.js
  // lets it know to toggle the state so that the Modal's parent does not render it
  handleCloseButtonClick(event) {
    this.props.onCloseButtonClick();
  }

  // CSS using absolute positioning, with a z-index above regular content,
  // so it shows above the search bar and its content
  render() {
    return (
      <div id="modal">
        <div id="modal-box">
          <p className="title-text">{"Country: " + this.props.countryObject.country}</p>
          <p>{this.props.countryObject.city !== null ? "Capital: " + this.props.countryObject.city : "No capital"}</p>
          <button onClick={this.handleCloseButtonClick}>Close</button>
        </div>
      </div>
    );
  }
}

export default Modal;
