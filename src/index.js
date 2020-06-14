import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./App";
import reducers from "./reducers";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import config from './aws-exports'

Amplify.configure(config)

const customHistory = createBrowserHistory();
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

Amplify.configure(awsconfig);

ReactDOM.render(
  <Provider store={store}>
    <Router history={customHistory}>
      <App />
    </Router>
  </Provider>,
  document.querySelector("#root")
);
serviceWorker.unregister();
