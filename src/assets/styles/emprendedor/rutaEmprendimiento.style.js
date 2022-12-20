import styled from "styled-components";

export const Titulo = styled.h1`
  font-size: 2rem;
  margin: 1rem 2rem;
`;

export const SubTitulo = styled.h2`
  font-size: 1.5rem;
`;

export const Auxiliar = styled.span`
  font-size: 1.2rem;
`;

export const CardRuta = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 98%;
  /* height: 80%; */
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const Ruta = styled.div`
  width: 100%;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-bottom: 2rem;
  padding: 15px 16px 30px 14px;
  border-radius: 4px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;
`;

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
  @media only screen and (max-width: 1024px) {
    width: 80px;
    height: 80px;
  }
  @media only screen and (max-width: 728px) {
    width: 45px;
    height: 45px;
  } ;
`;
export const NumeroRuta = styled.span`
  display: flex;
  align-items: center;
  font-size: 50px;
  font-weight: 900;
  margin-left: auto;
  margin-right: auto;
  color: white;
  @media only screen and (max-width: 1024px) {
    font-size: 30px;
  }
  @media only screen and (max-width: 728px) {
    font-size: 30px;
  } ;
`;
