import styled from "styled-components";
import { Link } from "react-router-dom";

export const LinkNav = styled(Link)`
  list-style-type: none;
  padding: 5px 15px;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: all 0.5s;
  text-decoration: none;
  color: inherit;
  &:hover {
    border: 2px solid #0f52ba;
    background-color: #4682b4;
    color: white;
    cursor: pointer;
  }
`;
export const Button = styled(Link)`
  padding: 10px 25px;
  text-decoration: none;
  color: inherit;
  margin: 10px 0;
  background-color:#4682b4;
  border-radius: 30px;
  border: 0;
  &:hover {
    cursor: pointer;
    background-color: white;
    color:#4682b4;
    transition: all 0.5s;
  }
`;
