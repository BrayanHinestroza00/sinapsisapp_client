import styled from "styled-components";

const PanelSuperior = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  top: 0;
  height: 4.5rem;
  width: 100%;
  padding: 10px 30px;
  background-color: #ffffff;
  z-index: 1050;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
`;

const ContenedorControlesUsuario = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const LogoSinapsis = styled.img`
  display: flex;
  flex-direction: row;
  align-self: center;
  height: 4rem;
`;

const LogoSinapsisContainer = styled.button`
  display: flex;
  flex-direction: row;
  align-self: center;
  height: 4rem;
  border: none;
  outline: none;
  &:focus {
    border: none;
    outline: none;
  }
`;

const LabelNombreUsuario = styled.p`
  margin-top: 1rem;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
`;
const LogoHeader = styled.img`
  height: auto;
  width: auto;
  object-fit: contain;
  padding-left: 0rem;
`;
const IconoHeader = styled.img`
  width: 2rem;
  height: 2rem;
  /* margin-left: 1rem; */
  /* margin-right: 1rem; */
`;
const BotonHeader = styled.button`
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  &:hover {
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    line-height: normal;
    overflow: visible;
    padding: 0;
  }
`;

export const headerStyled = {
  PanelSuperior,
  ContenedorControlesUsuario,
  LogoSinapsis,
  LabelNombreUsuario,
  LogoHeader,
  IconoHeader,
  BotonHeader,
  LogoSinapsisContainer,
};
