import React, { useContext, useEffect, useState } from "react";
import { Page } from "../../components/Page";
import { useLanguage, NavbarContext } from "../../context";
import { certificates } from "../../data";
import { CertificateItem } from "./CertificateItem";
import { CertificateModal } from "./CertificateModal";
import { CertificatesGrid } from "./Certificates.styled";
import { useInView } from "react-intersection-observer";

export const Certificates = () => {
    const { t } = useLanguage();
    const setPage = useContext(NavbarContext);
    const { ref: viewRef, inView } = useInView({ threshold: 0.2 });

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

    return (
        <div ref={viewRef}>
            <Page header={t("certificates.header")} id="certificates">
                <CertificatesGrid>
                    {certificates.map((cert, index) => (
                        <CertificateItem
                            key={index}
                            data={cert}
                            onOpenModal={handleOpenModal}
                        />
                    ))}
                </CertificatesGrid>
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
