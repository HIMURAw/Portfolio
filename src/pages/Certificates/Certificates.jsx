import React, { useContext, useEffect, useState, useRef } from "react";
import { Page } from "../../components/Page";
import { useLanguage, NavbarContext } from "../../context";
import { certificates } from "../../data";
import { CertificateItem } from "./CertificateItem";
import { CertificateModal } from "./CertificateModal";
import { NextButton } from "../Projects/carasoulButton";
import { CertificateContainer, Carasoul } from "./Certificates.styled";
import { useInView } from "react-intersection-observer";

export const Certificates = () => {
    const { t } = useLanguage();
    const setPage = useContext(NavbarContext);
    const { ref: viewRef, inView } = useInView({ threshold: 0.2 });
    const scrollRef = useRef(null);

    const [modalData, setModalData] = useState({
        isOpen: false,
        certPath: null,
        title: "",
    });

    useEffect(() => {
        if (inView) setPage("certificates");
    }, [inView]);

    const handleOpenModal = (certPath, title) => {
        setModalData({
            isOpen: true,
            certPath,
            title,
        });
    };

    const handleCloseModal = () => {
        setModalData({
            ...modalData,
            isOpen: false,
        });
    };

    const moveLeft = () => {
        if (scrollRef.current) {
            const wrapper = scrollRef.current.querySelector(".wrapper");
            wrapper.scrollLeft += 600;
        }
    };

    const moveRight = () => {
        if (scrollRef.current) {
            const wrapper = scrollRef.current.querySelector(".wrapper");
            wrapper.scrollLeft -= 650;
        }
    };

    return (
        <div ref={viewRef}>
            <Page header={t("certificates.header")} id="certificates">
                <CertificateContainer ref={scrollRef}>
                    <div className="wrapper">
                        {certificates.map((cert, index) => (
                            <CertificateItem
                                key={index}
                                index={index}
                                data={cert}
                                onOpenModal={handleOpenModal}
                            />
                        ))}
                    </div>
                </CertificateContainer>
                <Carasoul>
                    <NextButton flip onClick={moveRight} />
                    <NextButton onClick={moveLeft} />
                </Carasoul>
            </Page>

            <CertificateModal
                isOpen={modalData.isOpen}
                onClose={handleCloseModal}
                certPath={modalData.certPath}
                title={modalData.title}
            />
        </div>
    );
};
