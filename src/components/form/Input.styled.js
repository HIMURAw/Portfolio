import styled from "styled-components";
import { typeScale } from "../../utils";

export const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: ${typeScale.paragraph};
  background-color: ${(props) => props.theme.glass};
  color: ${(props) => props.theme.text};
  width: ${(props) => (props.full ? "100%" : "auto")};
  outline: none;
  border: 3px solid ${(props) => props.theme.brutal};
  box-shadow: 8px 8px 0 ${(props) => props.theme.brutal};
  border-radius: 0.5rem;
  transition: all 0.1s ease;
  &:focus,
  &:active {
    background-color: ${(props) => props.theme.glassBorder};
    box-shadow: 6px 6px 0 ${(props) => props.theme.brutal};
  }
`;
