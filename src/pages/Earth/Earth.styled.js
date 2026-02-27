import styled from "styled-components";

export const EarthWrapper = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 100svh;
  }
`;

export const EarthTitle = styled.h2`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 3rem;
  z-index: 10;
  pointer-events: none;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-weight: 300;
  letter-spacing: 0.5rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    letter-spacing: 0.3rem;
    top: 8%;
  }
`;

