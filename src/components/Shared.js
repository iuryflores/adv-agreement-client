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
  position:absolute;
  top:80px;
  right:10px;
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

export const MsgError = styled.div`
background-color:#FA8072;
padding:5px 20px;
margin-bottom:10px;
border-radius:5px;
`
export const DefendantCard = styled(Link)`
border:1px solid #4682b4;
padding:10px 15px;
background-color:aliceblue;
color:#0F52BA;
display:flex;
width:70vw;
justify-content:space-between;
align-items:center;
text-decoration:none;
margin-top:5px;
border-radius:10px;
&:hover {
  background-color:#4682b4;
  color:white;
}
`
export const ButtonView = styled(Link)`
background-color:aliceblue;
padding: 10px 20px;
display:flex;
align-items:center;
justify-content:center;
text-decoration:none;
margin-top:5px;
border-radius:10px;
border:2px solid transparent;
color:#0f52ba;
&:hover {
  background-color:#4682b4;
  color:white;
  border:2px solid white;
}
`