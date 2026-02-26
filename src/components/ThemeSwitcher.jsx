import React from "react";
import styled from "styled-components";
import { useTheme } from "../context/ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";

const SwitcherContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  background: ${(props) => props.theme.glass};
  backdrop-filter: blur(10px);
  padding: 5px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.glassBorder};
  box-shadow: 0 4px 15px ${(props) => props.theme.shadow};
`;

const ThemeButton = styled.button`
  background: transparent;
  color: ${(props) => props.theme.text};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;

  &:hover {
    background: ${(props) => props.theme.glassBorder};
    transform: rotate(15deg);
  }
`;

export const ThemeSwitcher = () => {
    const { themeMode, toggleTheme } = useTheme();

    return (
        <SwitcherContainer>
            <ThemeButton onClick={toggleTheme} title={themeMode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                {themeMode === "dark" ? <BsSun /> : <BsMoon />}
            </ThemeButton>
        </SwitcherContainer>
    );
};
