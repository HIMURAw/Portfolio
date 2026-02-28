import styled from "styled-components";
import { motion } from "framer-motion";

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 2rem;
`;

export const ModalContainer = styled(motion.div)`
  background: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.accent + "40"};
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.accent + "20"};

  h3 {
    margin: 0;
    font-size: 1.5rem;
    color: ${(props) => props.theme.text};
    font-weight: 500;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  transition: all 0.2s ease;
  border-radius: 50%;

  &:hover {
    background: ${(props) => props.theme.accent + "20"};
    color: ${(props) => props.theme.accent};
    transform: rotate(90deg);
  }
`;

export const ModalBody = styled.div`
  flex: 1;
  padding: 1rem;
  background: #1a1a1a;
  display: flex;
  flex-direction: column;
`;

export const CVViewer = styled.embed`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

export const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${(props) => props.theme.accent + "20"};
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
