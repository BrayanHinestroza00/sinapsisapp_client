import styled from "styled-components";
import { devices } from "src/app/Shared/assets/styles/Breakpoints/Breakpoints";

export const Sidebar = styled.div`
  padding: 0;
  /* width: max-content; */
  background: rgb(117, 42, 136);
  background: linear-gradient(
    180deg,
    rgba(117, 42, 136, 1) -11%,
    rgba(145, 100, 160, 1) 85%
  );
  /* background-color: #9164a0; */
  @media ${devices.lg} {
    max-width: 30vw;
  }
  @media ${devices.sm} {
    display: none;
  }
`;

export const EtiquetaSidebar = styled.span`
  margin: 1rem;
  font-weight: bold;
  text-align: center;
  font-size: 1rem;
  @media ${devices.lg} {
    font-size: 1.5rem;
  }
  @media ${devices.sm} {
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
