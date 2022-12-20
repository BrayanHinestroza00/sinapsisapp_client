import styled from "styled-components";
import image from "../images/Sinapsis-LR.png";

const Grid_Layout = styled.div`
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

const Imagen = styled.img`
  width: 100vh;
  height: 100vh;
  @media only screen and (max-width: 1280px) {
    display: none;
  }
`;

const ImagenRegistro = styled.img`
  max-width: 60rem;
  height: 100%;
  @media only screen and (max-width: 1280px) {
    display: none;
  }
`;

const Contenedor_Derecho = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1280px) {
    margin: 110px 40px;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  border-radius: 9px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #fcfcfc;
`;

const CardSignUp = styled.div`
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

const Contenedor_Formulario = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 60px;
`;

const Formulario = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Logo_Sinapsis = styled.img`
  width: 200px;
  min-height: 120px;
`;

const Logo_Sinapsis_Registro = styled.img`
  width: 300px;
  min-height: 120px;
`;

const Figura = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-size: 18px;
`;
const Titulo = styled.h1`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.21;
  margin-bottom: 15px;
  color: #333333;
`;
const InputContainer = styled.div`
  width: 20rem;
  margin: 0 0 1rem 0;
  text-align: justify;
  font-weight: bold;
`;
const InputContainerRegistro = styled.div`
  width: 100%;
  margin: 0 0 1rem 0;
  text-align: justify;
  font-weight: bold;
`;
const SmallError = styled.small`
  color: #dc3545;
  font-size: 14px;
`;
const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 5px 10px;
  font-size: 20px;
  border-radius: 4px;
  border: solid 1px rgba(154, 102, 168, 0.35);
`;

const InputSelect = styled.select`
  width: 100%;
  height: 2.5rem;
  padding: 5px 10px;
  font-size: 20px;
  border-radius: 4px;
  border: solid 1px rgba(154, 102, 168, 0.35);
`;
const BotonesContainer = styled.div`
  align-self: center;
  &:last-child {
    text-align: center;
  }
`;
const Boton = styled.button`
  flex-direction: column;
  align-items: center;
  width: 20rem;
  height: 2.5rem;
  margin-bottom: 1rem;
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

const BotonEleccion = styled.button`
  flex-direction: column;
  align-items: center;
  width: 20rem;
  margin-bottom: 1rem;
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

export const loginStyled = {
  Grid_Layout,
  Imagen,
  Contenedor_Derecho,
  Card,
  Contenedor_Formulario,
  Figura,
  Formulario,
  Logo_Sinapsis,
  Label,
  Titulo,
  InputContainer,
  SmallError,
  Input,
  InputSelect,
  BotonesContainer,
  Boton,
};

export const signUpStyled = {
  Grid_Layout,
  ImagenRegistro,
  Contenedor_Derecho,
  Card,
  Contenedor_Formulario,
  Figura,
  Formulario,
  Logo_Sinapsis_Registro,
  Label,
  Titulo,
  InputContainerRegistro,
  SmallError,
  Input,
  InputSelect,
  BotonesContainer,
  Boton,
  BotonEleccion,
  CardSignUp,
};
