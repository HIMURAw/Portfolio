import React from "react";
import styled from "styled-components";
import { useLanguage } from "../context/LanguageContext";

const SwitcherContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  display: flex;
  gap: 5px;
  background: ${(props) => props.theme.glass};
  backdrop-filter: blur(10px);
  padding: 5px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.glassBorder};
  box-shadow: 0 4px 15px ${(props) => props.theme.shadow};
`;

const LanguageButton = styled.button`
  background: ${(props) => (props.active ? props.theme.primary : "transparent")};
  color: ${(props) => (props.active ? props.theme.brutal : props.theme.textSecondary)};
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;

  &:hover {
    color: ${(props) => props.theme.text};
    background: ${(props) => props.theme.glass};
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
