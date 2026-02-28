import React from "react";
import { Button } from "../../components/form";
import { StyledCertificateCard } from "./Certificates.styled";
import { useLanguage } from "../../context";

export const CertificateItem = ({ data, onOpenModal }) => {
    const { t } = useLanguage();

    return (
        <StyledCertificateCard
            color={data.color}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="bg-glow" />
            <div className="card-content">
                <div className="header">
                    <div className="logo-wrapper">
                        <img src={data.logo} alt={data.issuer} />
                    </div>
                    <div className="titles">
                        <h3>{data.title}</h3>
                        <span>{data.issuer}</span>
                    </div>
                </div>

                <p>{data.bio}</p>

                <div className="footer">
                    <span className="date">{data.date}</span>
                    {data.link && (
                        <Button
                            sm
                            onClick={(e) => {
                                e.preventDefault();
                                if (data.link.endsWith('.pdf')) {
                                    onOpenModal(data.link, data.title);
                                } else {
                                    window.open(data.link, "_blank");
                                }
                            }}
                        >
                            {data.link.endsWith('.pdf') ? t("certificates.viewPdf") : t("certificates.viewCert")}
                        </Button>
                    )}
                </div>
            </div>
        </StyledCertificateCard>
    );
};
