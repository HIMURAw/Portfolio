import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { typeScale } from "../../utils";

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.1); }
  50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.2); }
  100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.1); }
`;

export const CertificateContainer = styled.section`
  grid-column: 1/ 13;
  width: 100%;
  transition: transform 1s cubic-bezier(0.46, 0.35, 0, 1.27);
  align-self: center;
  .wrapper {
    scroll-behavior: smooth;
    flex-shrink: 0;
    display: flex;
    overflow-x: auto;
    justify-content: start;
    align-items: center;
    overflow-y: hidden;
    padding-inline-end: 2rem;
    background: transparent;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  @media screen and (max-width: 720px) {
    grid-column: 1 / 7;
  }
`;

export const Carasoul = styled.div`
  grid-column: 1/13;
  display: flex;
  justify-content: center;
  gap: 1rem;

  button {
    all: unset;
    cursor: pointer;
    padding: 0.5rem;
  }

  svg {
    width: 60px;
  }
  @media screen and (max-width: 720px) {
    grid-column: 1 / 7;
  }
`;

const fadeIn = keyframes`
  0%{ 
    translate: 0 200px 0;
  }
  100%{
    translate: 0 0 0;
  }
`;

export const Cube = styled.div`
  translate: 0 200px 0;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(35deg) rotateY(45deg);
  width: 320px;
  height: 340px;
  display: flex;
  align-items: flex-end;
  flex-shrink: 0;
  &:hover {
    transform: rotateY(0) scale(1.5) translateX(20%) translateY(-20%);
  }
  transition: all 0.2s cubic-bezier(0.4, 0.55, 0.2, 1.03);
  @media screen and (max-width: 720px) {
    width: 270px;
    height: 340px;
  }

  &.fadeIn {
    animation: ${fadeIn} 500ms ease forwards;
    animation-delay: ${(props) => props.index * 0.05}s;
  }
`;

export const Face = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  overflow: hidden;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  &.face-2 {
    background-color: ${(props) => props.theme.glass};
    transform: rotateY(90deg);
    transform-origin: right;
    box-shadow: -0.6rem 0.6rem 0 ${(props) => props.theme.brutal};
    .text {
      color: ${(props) => props.theme.text};
      height: 100%;
      transform: rotateY(180deg);
      display: flex;
      padding: 0.5rem;
      align-items: flex-end;
      font-size: ${typeScale.text};
    }
  }
  &.face-3 {
    background-color: ${(props) => props.theme.surface};
    transform: rotateX(90deg);
    transform-origin: top;
    .text {
      color: ${(props) => props.theme.text};
      transform: rotateX(180deg);
      padding: 0.5rem;
      font-size: ${typeScale.subtitle};
      line-height: 2.2rem;
    }
  }
  &.face-1 {
    box-shadow: 0.6rem 0.2rem 0 ${(props) => props.theme.brutal};

    .img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: -1;
      transition: all 0.2s ease;
      background-image: url(${(props) => props.image});
      background-size: auto 200px;
      background-position: center;
    }

    .content {
      transition: all 0.2s ease;
      opacity: 0;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      height: 100%;
      color: ${(props) => props.theme.text};
      .buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    &:hover {
      box-shadow: 0.6rem 0.6rem 0 ${(props) => props.theme.brutal};
      .content {
        opacity: 1;
        transform: scale(0.8);
        height: 100%;
      }
      .img {
        filter: brightness(20%) grayscale(100%);
      }
    }
  }

  @media screen and (max-width: 720px) {
    width: 160px;
    height: 160px;
    &.face-1 {
      .img {
        background-size: auto 160px;
      }
      .content {
        .text-h {
          font-size: ${typeScale.paragraph};
        }
        .text-p {
          font-size: ${typeScale.helperText};
          line-height: 1.2rem;
        }
        .buttons {
          justify-content: space-around;
          button {
            transform: scale(0.8);
          }
        }
      }
    }
    &.face-2 {
      .text {
        font-size: ${typeScale.paragraph};
        line-height: 1.2rem;
      }
    }
    &.face-3 {
      .text {
        font-size: ${typeScale.text};
        line-height: 1.2rem;
      }
    }
  }
`;

export const StyledCertificateCard = styled(motion.div)`
  background: ${(props) => props.theme.glass};
  backdrop-filter: blur(12px);
  border: 1px solid ${(props) => props.color ? props.color[60] + "40" : props.theme.accent + "20"};
  border-radius: 1.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${(props) => props.color ? props.color[60] : props.theme.accent};
    transform: translateY(-5px);
    animation: ${glow} 2s infinite ease-in-out;
    
    .bg-glow {
        opacity: 0.15;
    }
  }

  .bg-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${(props) => props.color ? props.color[60] : props.theme.accent} 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
    z-index: 0;
  }

  .card-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    .logo-wrapper {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.05);
      padding: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid rgba(255, 255, 255, 0.1);

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .titles {
      h3 {
        font-size: 1.25rem;
        margin: 0;
        color: ${(props) => props.theme.text};
      }
      span {
        font-size: 0.9rem;
        color: ${(props) => props.theme.accent};
        opacity: 0.8;
      }
    }
  }

  p {
    font-size: 0.95rem;
    line-height: 1.5;
    color: ${(props) => props.theme.text};
    opacity: 0.7;
    margin: 0;
    flex-grow: 1;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;

    .date {
      font-size: 0.85rem;
      font-weight: 600;
      color: ${(props) => props.theme.text};
      opacity: 0.5;
    }
  }
`;
