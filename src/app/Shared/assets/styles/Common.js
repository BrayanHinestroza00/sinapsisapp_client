import styled from "styled-components";

export const Titulo = styled.h1`
  font-size: 2rem;
`;

export const Subtitulo = styled.h2`
  font-size: 1.5rem;
`;

export const SpanAuxiliar = styled.span`
  font-size: 1.2rem;
`;

export const Card = styled.div`
  padding: "0.5rem 2rem 1rem 2rem";
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;
`;

export const CardRuta = styled.div`
  /* margin-top: 2rem;
  margin-bottom: 2rem; */
  width: 98%;
  /* height: 80%; */
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const Ruta = styled.div`
  width: 100%;
  /* margin-left: 2rem;
  margin-right: 2rem;
  margin-bottom: 2rem; */
  padding: 15px 16px 30px 14px;
  border-radius: 4px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;
`;

export const Label = styled.label`
  font-family: Roboto;
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
