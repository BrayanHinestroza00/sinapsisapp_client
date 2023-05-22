import styled from "styled-components";
import { devices } from "src/app/Shared/assets/styles/Breakpoints/Breakpoints";

export const CirculoRuta = styled.button`
  display: flex;
  border: solid 1px #000;
  width: 100px;
  height: 100px;
  margin: 5px auto;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  align-items: center;
  @media ${devices.lg} {
    width: 80px;
    height: 80px;
  }
  @media ${devices.md} {
    width: 45px;
    height: 45px;
  }
`;
export const NumeroRuta = styled.span`
  display: flex;
  align-items: center;
  font-size: 50px;
  font-weight: 900;
  margin-left: auto;
  margin-right: auto;
  color: white;
  @media ${devices.lg} {
    font-size: 30px;
  }
  @media ${devices.md} {
    font-size: 30px;
  }
`;
