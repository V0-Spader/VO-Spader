import React from "react";
import Coffee from "./Coffee";
import Lays from "./Lays";
import Soda from "./Soda";
import Navbar from "./Navbar";
import { Route, Switch } from "react-router-dom";
import VendingMachine from "./VendingMachine";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={VendingMachine} />
        <Route exact path="/Coffee" component={Coffee} />
        <Route exact path="/Lays" component={Lays} />
        <Route exact path="/Soda" component={Soda} />
      </Switch>
    </div>
  );
}
