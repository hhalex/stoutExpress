import { Header } from "../../components/Header";
import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { WholeContainer, Body } from "../../components/Layout";

const AppComponent = () => (
  <WholeContainer>
    <Header />
    <Body>
      Home page
      <Link to="hops">To Hops</Link>
    </Body>
  </WholeContainer>
);

export default AppComponent;
