import styled from "styled-components";

export const Contenido = styled.div`
  margin: 1rem auto;
  font-family: Montserrat, sans-serif;
  color: #333333;
`;

export const TituloStepByStep = styled.div`
  margin-bottom: 1rem;
  font-size: 40px;
`;

export const Circulo = styled.div`
  display: flex;
  border: solid 1px #9a66a8;
  background-color: #9a66a8;
  width: 100px;
  height: 100px;
  margin: 5px auto;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
`;

export const Paso = styled.span`
  display: flex;
  align-items: center;
  font-size: 50px;
  font-weight: 900;
  margin-left: auto;
  margin-right: auto;
  color: white;
`;

export const Label = styled.label`
  font-family: Montserrat, sans-serif;
  font-size: 1.5rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: normal;
  text-align: left;
  color: #333333;
`;

export const Input = styled.input`
  border-radius: 4px;
  border: solid 1px rgba(154, 102, 168, 0.35);
`;

export const TextArea = styled.textarea`
  border-radius: 4px;
  border: solid 1px rgba(154, 102, 168, 0.35);
  height: 6rem;
  resize: vertical;
`;

export const Boton = styled.button`
  align-content: center;
  font-size: 17px;
  /* width: 15rem;
  //height: 2.5rem;
  margin-top: 2rem;
  margin-left: 2rem; */
  border-radius: 5px;
  &:hover {
    font-size: 19px;
    transition-duration: 300ms;
  }
  & .btnNext {
    background-color: #9a66a8;
    border-color: #9a66a8;
    &:hover {
      background-color: #803896;
      border-color: #5a2e66;
    }
    &:focus {
      background-color: #4f215c;
    }
  }
`;

export const BotonSiguiente = styled.button`
  align-content: center;
  font-size: 17px;
  /* width: 15rem;
  height: 2.5rem;
  margin-top: 2rem;*/
  margin-left: 2rem;
  border-radius: 5px;
  background-color: #9a66a8;
  border-color: #9a66a8;

  &:hover {
    background-color: #803896;
    border-color: #5a2e66;
  }
  &:focus {
    background-color: #4f215c;
  }
`;
