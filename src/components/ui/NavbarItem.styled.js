import styled from "styled-components";
import { blue, typeScale } from "../../utils";

export const NavbarItem = styled.a`
  font-size: ${typeScale.text};
  font-weight: semibold;
  color: ${(props) => props.theme.textSecondary};
  transition: all 0.2s ease-out;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  user-select: none;
  text-transform: capitalize;
  .dot {
    width: 8px;
    height: 8px;
    background-color: ${(props) => props.theme.primary};
    border-radius: 50%;
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
  &:hover,
  &:focus {
    color: ${(props) => props.theme.text};
  }

  &:active,
  &.active {
    color: ${(props) => props.theme.text};
  }

  @media screen and (max-width: 720px) {
    margin-left: 0.5rem;
    color: ${(props) => props.theme.textSecondary};
    .dot {
      left: -15px;
      bottom: 50%;
      transform: translateY(50%);
    }
  }
`;
