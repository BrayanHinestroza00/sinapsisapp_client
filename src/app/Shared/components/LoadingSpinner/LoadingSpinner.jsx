import { Spinner, SpinnerContainer } from "./styled";

function LoadingSpinner({ width, height }) {
  return (
    <SpinnerContainer>
      <Spinner width={width} height={height} />
    </SpinnerContainer>
  );
}

export default LoadingSpinner;
