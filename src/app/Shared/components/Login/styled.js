import styled from "styled-components";
import image from "src/app/Shared/assets/images/panel_lateral.png";
import { devices } from "../../assets/styles/Breakpoints/Breakpoints";

export const LoginContainer = styled.div`
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

export const LoginLeftPanelImage = styled.img`
  width: 100vh;
  height: 100vh;
  @media ${devices.lg} {
    display: none;
  }
`;

export const LoginRightPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${devices.lg} {
    margin: 110px 40px;
  }
`;

export const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  border-radius: 9px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #fcfcfc;
`;

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 60px;
`;

export const LoginFormImageContainer = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginFormImageElement = styled.img`
  width: 200px;
  min-height: 120px;
`;

export const LoginFormTitulo = styled.h1`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.21;
  /* margin-bottom: 15px; */
  color: #333333;
`;

export const LoginFormDescription = styled.p`
  text-align: center;
  color: #777;
`;

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const LoginFormButtonContainer = styled.div`
  align-self: center;
  &:last-child {
    text-align: center;
  }
`;

export const LoginFormButton = styled.button`
  width: 100%;
  border-radius: 5px;
  background-color: #9a66a8;
  border-color: #9a66a8;
  &:hover {
    background-color: #7e2e94;
    border-color: #5a2e66;
  }
  &:focus {
    background-color: #3d1647;
    border-color: #3d1647;
  }
`;

export const LoginFormFieldError = styled.small`
  color: #dc3545;
  font-size: 14px;
`;

export const LoginErrorAPI = styled.p`
  text-align: center;
  color: #777;
`;
