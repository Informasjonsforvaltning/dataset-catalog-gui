import styled, { keyframes } from 'styled-components';

const spinnerKeyframes = keyframes`
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.825, 0.005, 0.235, 1);
    }
    50% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0.72, 0.005, 0.26, 1);
    }
    100% {
      transform: rotate(0deg);
    }`;

const Spinner = styled.svg`
  width: 120px;
  height: 120px;
  transform: rotate(0deg);
  animation: ${spinnerKeyframes} 4000ms linear infinite normal forwards;
  & > svg > * {
    stroke: #335380;
  }
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default { Spinner, SpinnerContainer };
