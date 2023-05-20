import styled, { keyframes } from "styled-components";

const animation = keyframes`
 0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid #383636; /* Black */
  border-radius: 50%;
  animation: ${animation} 1.5s linear infinite;
`;

export const SpinnerContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
