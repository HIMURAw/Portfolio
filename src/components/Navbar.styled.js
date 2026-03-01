import styled from "styled-components";

export const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  z-index: 100;

  .nav-left,
  .nav-right {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex: 1;
  }

  .nav-left {
    justify-content: flex-end;
  }

  .nav-right {
    justify-content: flex-start;
  }

  @media screen and (max-width: 720px) {
    left: 0;
    transform: translateX(-150%);
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    width: 70vw;
    height: 100%;
    background-color: ${(props) => props.theme.glass};
    backdrop-filter: blur(10px);
    transition: transform 0.2s ease-in-out;
    padding: 2rem 1rem;

    .nav-left,
    .nav-right {
      flex-direction: column;
      align-items: flex-start;
      flex: unset;
    }

    .home_navbar-item {
      order: -1;
    }

    &.active {
      transform: translateX(0%);
    }
  }
`;
