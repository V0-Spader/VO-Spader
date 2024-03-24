import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Menu from "./MenuHook";
import Item from "./ItemHook";
import AddItemForm from "./AddItemForm";
import { v4 as uuid } from "uuid";
import My404 from "./my404";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  /** we use the getSnacks /getDrinks functions to draw from api in api.js */
  useEffect(() => {
    async function getSnacks() {
      let snacks = await SnackOrBoozeApi.getSnacks();
      setSnacks(snacks);
      setIsLoading(false);
    }
    getSnacks();
  }, []);

  useEffect(() => {
    async function getDrinks() {
      let drinks = await SnackOrBoozeApi.getDrinks();
      setDrinks(drinks);
      setIsLoading(false);
    }
    getDrinks();
  }, []);

  /** It is the function pass down to thr form, give it unique id from uuid() */
  const add = (formData, type) => {
    if (type === "snacks") {
      setSnacks((snacks) => [...snacks, { ...formData, id: uuid() }]);
    } else {
      setDrinks((drinks) => [...drinks, { ...formData, id: uuid() }]);
    }
  };

  /** if the data not receiving it will loading */
  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home items={snacks} />
            </Route>

            <Route exact path="/:type/new">
              <AddItemForm add={add} />
            </Route>

            <Route exact path="/snacks">
              <Menu items={snacks} title="Snacks" />
            </Route>
            <Route path="/snacks/:id">
              <Item items={snacks} cantFind="/snacks" />
            </Route>

            <Route exact path="/drinks">
              <Menu items={drinks} title="Drinks" />
            </Route>

            <Route exact path="/drinks/:id">
              <Item items={drinks} cantFind="/drinks" />
            </Route>

            <Route>
              <My404 />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;