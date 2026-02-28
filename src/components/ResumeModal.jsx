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
} from "./ResumeModal.styled";
import { Button } from "./form";
import { useLanguage } from "../context";
import trCV from "../assets/turkce_CV.pdf";
import enCV from "../assets/ingilizce_CV.pdf";

export const ResumeModal = ({ isOpen, onClose }) => {
    const { language, t } = useLanguage();

    const cvPath = language === "tr" ? trCV : enCV;

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
                            <h3>{t("contact.resume")}</h3>
                            <CloseButton onClick={onClose}>
                                <AiOutlineClose size={24} />
                            </CloseButton>
                        </ModalHeader>

                        <ModalBody>
                            <CVViewer
                                src={cvPath}
                                type="application/pdf"
                            />
                        </ModalBody>

                        <ModalFooter>
                            <a href={cvPath} download>
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
