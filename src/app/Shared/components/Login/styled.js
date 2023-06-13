import styled from "styled-components";
import image from "src/app/Shared/assets/images/panel_lateral.png";

export const LoginContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100vh;
  @media only screen and (max-width: 1280px) {
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
  @media only screen and (max-width: 1280px) {
    display: none;
  }
`;

export const LoginRightPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1280px) {
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

export const LoginFormContainer = styled.form`
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
  margin-bottom: 15px;
  color: #333333;
`;
