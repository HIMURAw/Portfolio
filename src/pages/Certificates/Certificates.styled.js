import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { typeScale } from "../../utils";

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.1); }
  50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.2); }
  100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.1); }
`;

export const CertificatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
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
