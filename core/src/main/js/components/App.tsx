import * as React from "react";
import HopsDetails from "../containers/hops-details";
import HopsList from "../containers/hops-list";

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
