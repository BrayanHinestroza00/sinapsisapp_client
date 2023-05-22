import styled from "styled-components";
import image from "src/app/Shared/assets/images/panel_lateral.png";
import { devices } from "src/app/Shared/assets/styles/Breakpoints/Breakpoints";

export const SignUpContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100vh;
  @media ${devices.lg} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px;
    background-image: url(${image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`;

export const SignUpLeftPanelImage = styled.img`
  max-width: 60rem;
  height: 100%;
  @media ${devices.lg} {
    display: none;
  }
`;

export const SignUpRightPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${devices.lg} {
    margin: 110px 40px;
  }
`;

export const SignUpCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40vw;
  padding: 40px 0;
  border-radius: 9px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #fcfcfc;
`;

export const SignUpForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 60px;
`;

export const SignUpFormImageContainer = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SignUpFormImageElement = styled.img`
  width: 300px;
  min-height: 120px;
`;

export const SignUpFormTitulo = styled.h1`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.21;
  margin-bottom: 15px;
  color: #333333;
`;

export const SignUpFormDescription = styled.p`
  text-align: center;
  color: #777;
`;

export const SignUpFormButton = styled.button`
  flex-direction: column;
  align-items: center;
  width: 20rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  padding: 2rem;
  border-radius: 5px;
  background-color: #9a66a8;
  border-color: #9a66a8;
  color: #fff;
  font-weight: bold;
  &:hover {
    background-color: #7e2e94;
    border-color: #5a2e66;
    color: #fff;
    font-weight: bold;
  }
  &:focus {
    background-color: #3d1647;
    border-color: #3d1647;
    color: #fff;
    font-weight: bold;
  }
`;
