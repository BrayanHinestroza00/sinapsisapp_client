import styled from "styled-components";

export const Sidebar = styled.div`
  padding: 0;
  width: max-content;
  background: rgb(117, 42, 136);
  background: linear-gradient(
    180deg,
    rgba(117, 42, 136, 1) -11%,
    rgba(145, 100, 160, 1) 85%
  );
  /* background-color: #9164a0; */
  @media only screen and (max-width: 1024px) {
    max-width: 30vw;
  }
  @media only screen and (max-width: 524px) {
    display: none;
  }
`;

export const EtiquetaSidebar = styled.span`
  margin: 1rem;
  font-weight: bold;
  text-align: center;
  font-size: 1rem;
  @media only screen and (max-width: 1024px) {
    font-size: 1.5rem;
  }
  @media only screen and (max-width: 524px) {
    font-size: 1.5rem;
  }
`;

export const AccordionItemSidebar = styled.button`
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;

  &:active {
    border-color: transparent;
  }

  &:focus {
    border-color: transparent;
  }
`;
