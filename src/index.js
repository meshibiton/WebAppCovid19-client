import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import App from "./App";
import Manager from "./Manager";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Nav />

      <Switch>
      <Route path="/" exact component={App} />
      <Route path="/Manager" component={Manager} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
