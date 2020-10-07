import React from "react";
import "./Modal.css";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
  }

  handleCloseButtonClick(event) {
    this.props.onCloseButtonClick();
  }

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
