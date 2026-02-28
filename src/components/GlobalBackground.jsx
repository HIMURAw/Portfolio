import React from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import Starfield from "../pages/Earth/Starfield";

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  background-color: transparent;
`;

export const GlobalBackground = () => {
    return (
        <BackgroundContainer>
            <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
                <Starfield numStars={5000} />
            </Canvas>
        </BackgroundContainer>
    );
};
