import * as React from "react";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
import { ConnectedRouter, routerMiddleware, routerReducer } from "react-router-redux";

import { createBrowserHistory } from "history";
import { applyMiddleware, combineReducers, createStore, Store } from "redux";

import { Route, Switch, SwitchProps } from "react-router";

import { resourceReducer } from "./reducers";
import Home from "./containers/pages/App";
import Hops from "./containers/pages/Hops";

import { ReduxState } from "state";

const history = createBrowserHistory();

const store: Store<ReduxState> = createStore(
  combineReducers({
    router: routerReducer,
    resource: resourceReducer
  }),
  applyMiddleware(routerMiddleware(history)),
);

const ConnectedSwitch = connect((state: ReduxState): SwitchProps => ({
  location: state.router.location
}))(Switch);

const AppContainer = () => (
  <ConnectedSwitch>
    <Route exact path="/" component={Home} />
    <Route exact path="/hops" component={Hops} />
  </ConnectedSwitch>
);

const App = connect((state: ReduxState) => ({
  location: state.router.location,
}))(AppContainer);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
);
