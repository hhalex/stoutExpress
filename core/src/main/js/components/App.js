// @flow

import React from "react";
import HopsList from "../containers/hops-list";
import HopsDetails from "../containers/hops-details";

const App = () => (
  <div>
    <h2>Hops List</h2>
    <HopsList />
    <hr />
    <h2>Hops Details</h2>
    <HopsDetails />
  </div>
);

export default App;
