import * as React from "react";
import { FaBeer, FaBook } from "react-icons/lib/fa";
import styled from "styled-components";

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

export const Header = () => (
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
);
