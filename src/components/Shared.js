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
  text-decoration: none;
  position: absolute;
  top: 100px;
  font-size: 2rem;
  right: 20px;
  color: inherit;
  width: 50px;
  height: 50px;
  background-color: #4682b4;
  border-radius: 30px;
  border: 0;
  &:hover {
    cursor: pointer;
    background-color: white;
    color: #4682b4;
    transition: all 0.5s;
  }
`;

export const MsgError = styled.div`

  background-color: #fa8072;
  padding: 5px 20px;
  margin-bottom: 10px;
  border-radius: 5px;
`;
export const MsgSucess = styled.div`
  background-color: #afe1af;
  padding: 5px 20px;
  margin-bottom: 10px;
  border-radius: 5px;
`;
export const DefendantCard = styled(Link)`
  border: 1px solid #4682b4;
  padding: 10px 15px;
  background-color: aliceblue;
  color: #0f52ba;
  display: flex;
  width: 90vw;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  margin-top: 5px;
  border-radius: 10px;
  &:hover {
    background-color: #4682b4;
    color: white;
  }
  p {
    display: flex;
    flex-direction: column;
  }
`;
export const ButtonView = styled(Link)`
  background-color: aliceblue;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin-top: 5px;
  border-radius: 10px;
  border: 2px solid transparent;
  color: #0f52ba;
  &:hover {
    background-color: #4682b4;
    color: white;
    border: 2px solid white;
  }
`;
export const ProcessCard = styled.div`
  border: 1px solid white;
 
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  padding: 5px 15px;
  background-color:aliceblue;
  color:#0F52BA;
  border-radius:5px;
`;
