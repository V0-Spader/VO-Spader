import React, { Component } from "react";
import Message from "./Message";
import { Link } from "react-router-dom";

class VendingMachine extends Component {
  render() {
    return (
      <div className="VendingMachine">
        <Message>
          <h1>Welcome to Vending Machine</h1>
        </Message>
        <Message>
          <h2>What would you like to have?</h2>
          <Link exact to="/soda">
            Soda
          </Link>
          <Link exact to="/lays">
            Lays
          </Link>
          <Link exact to="/Coffee">
            Coffee
          </Link>
        </Message>
      </div>
    );
  }
}

export default VendingMachine;
