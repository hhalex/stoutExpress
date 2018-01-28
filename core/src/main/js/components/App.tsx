import * as React from "react";
import { FaBeer, FaBook } from "react-icons/lib/fa";
import styled from "styled-components";
import { selectUser } from "../actions/all";
import HopsDetails from "../containers/hops-details";
import HopsList from "../containers/hops-list";

const WholeContainer = styled.div`
  background-color: #ecf0f1;
  width: 100%;
  height: 100%;
`;

const MenuBar = styled.div`
  top: 0px;
  left: 0px;
  width: 100%;
  position: absolute;
  min-height: 50px;
  background-color: #27ae60;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  margin-left: 1em;
  font-family: Arial Black;
  font-size: 24px;
  color: #ecf0f1;
`;
const MenuElement = styled.div`
  margin-right: 1em;
  display: flex;
  font-family: Arial Black;
  font-size: 24px;
  color: #ecf0f1;
  cursor: pointer;
`;

const MenuElements = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row-reverse;
`;

const App = () => (
  <WholeContainer>
    <MenuBar>
      <Title>DataBeer</Title>
      <MenuElements>
        <MenuElement>
          <FaBeer/>
        </MenuElement>
        <MenuElement>
          <FaBook/>
        </MenuElement>
      </MenuElements>
    </MenuBar>
    <h2>Hops List</h2>
    <HopsList selectUser={selectUser} />
    <hr />
    <h2>Hops Details</h2>
    <HopsDetails />
  </WholeContainer>
);

export default App;
