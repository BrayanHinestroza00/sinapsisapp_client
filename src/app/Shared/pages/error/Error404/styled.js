import styled from "styled-components";
import { devices } from "src/app/Shared/assets/styles/Breakpoints/Breakpoints";

export const Error404 = styled.div`
  position: relative;
  height: 100vh;
`;

export const Error404Container = styled.div`
  max-width: 767px;
  width: 100%;
  line-height: 1.4;
  text-align: center;
  padding: 15px;

  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

export const Error404TitleContainer = styled.div`
  position: relative;
  height: 220px;

  @media ${devices.sm} {
    position: relative;
    height: 168px;
  }
`;

export const Error404Title = styled.h1`
  font-family: "Kanit", sans-serif;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 186px;
  font-weight: 200;
  margin: 0px;
  background: linear-gradient(130deg, #ffa34f, #ff6f68);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  text-transform: uppercase;

  @media ${devices.sm} {
    font-size: 142px;
  }
`;

export const Error404SubTitle = styled.h2`
  font-family: "Kanit", sans-serif;
  font-size: 33px;
  font-weight: 200;
  text-transform: uppercase;
  margin-top: 0px;
  margin-bottom: 25px;
  letter-spacing: 3px;
  @media ${devices.sm} {
    font-size: 22px;
  }
`;

export const Error404Paragraph = styled.p`
  font-family: "Kanit", sans-serif;
  font-size: 16px;
  font-weight: 200;
  margin-top: 0px;
  margin-bottom: 25px;
`;

export const Error404Anchor = styled.a`
  font-family: "Kanit", sans-serif;
  color: #ff6f68;
  font-weight: 200;
  text-decoration: none;
  border-bottom: 1px dashed #ff6f68;
  border-radius: 2px;
`;
