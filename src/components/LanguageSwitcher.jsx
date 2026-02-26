import React from "react";
import styled from "styled-components";
import { useLanguage } from "../context/LanguageContext";

const SwitcherContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  display: flex;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 5px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const LanguageButton = styled.button`
  background: ${(props) => (props.active ? "rgba(255, 255, 255, 0.15)" : "transparent")};
  color: ${(props) => (props.active ? "#fff" : "rgba(255, 255, 255, 0.5)")};
  border: none;
  border-radius: 20px;
  padding: 5px 12px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const LanguageSwitcher = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <SwitcherContainer>
            <LanguageButton
                active={language === "en"}
                onClick={() => language !== "en" && toggleLanguage()}
            >
                EN
            </LanguageButton>
            <LanguageButton
                active={language === "tr"}
                onClick={() => language !== "tr" && toggleLanguage()}
            >
                TR
            </LanguageButton>
        </SwitcherContainer>
    );
};
