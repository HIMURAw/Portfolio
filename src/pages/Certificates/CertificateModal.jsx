import React from "react";
import { AnimatePresence } from "framer-motion";
import { AiOutlineClose, AiOutlineDownload } from "react-icons/ai";
import {
    ModalOverlay,
    ModalContainer,
    ModalHeader,
    CloseButton,
    ModalBody,
    CVViewer,
    ModalFooter,
} from "../../components/ResumeModal.styled";
import { Button } from "../../components/form";
import { useLanguage } from "../../context";

export const CertificateModal = ({ isOpen, onClose, certPath, title }) => {
    const { language } = useLanguage();

    return (
        <AnimatePresence>
            {isOpen && (
                <ModalOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <ModalContainer
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ModalHeader>
                            <h3>{title}</h3>
                            <CloseButton onClick={onClose}>
                                <AiOutlineClose size={24} />
                            </CloseButton>
                        </ModalHeader>

                        <ModalBody>
                            <CVViewer
                                src={certPath}
                                type="application/pdf"
                            />
                        </ModalBody>

                        <ModalFooter>
                            <a href={certPath} download>
                                <Button>
                                    <AiOutlineDownload size={20} style={{ marginRight: "8px" }} />
                                    {language === "tr" ? "İndir" : "Download"}
                                </Button>
                            </a>
                            <Button onClick={onClose}>
                                {language === "tr" ? "Kapat" : "Close"}
                            </Button>
                        </ModalFooter>
                    </ModalContainer>
                </ModalOverlay>
            )}
        </AnimatePresence>
    );
};
