import React from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "../../components/form/";
import { Cube, Face } from "./Certificates.styled";
import { useLanguage } from "../../context";

export const CertificateItem = ({ data, index, onOpenModal }) => {
    const { ref, inView } = useInView();
    const { t } = useLanguage();

    return (
        <Cube ref={ref} className={inView ? "fadeIn" : null} index={index}>
            <Face className="face-1" image={data.logo}>
                <div className="img"></div>
                <div className="content">
                    <h3 className="text-h">{data.title}</h3>
                    <p className="text-p">{data.issuer}</p>
                    <div className="buttons">
                        {data.link && (
                            <Button
                                sm
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (data.link.endsWith(".pdf")) {
                                        onOpenModal(data.link, data.title);
                                    } else {
                                        window.open(data.link, "_blank");
                                    }
                                }}
                            >
                                {data.link.endsWith(".pdf")
                                    ? t("certificates.viewPdf")
                                    : t("certificates.viewCert")}
                            </Button>
                        )}
                    </div>
                </div>
            </Face>
            <Face className="face-2">
                <div className="text">{data.bio}</div>
            </Face>
            <Face className="face-3">
                <div className="text">{data.title}</div>
            </Face>
        </Cube>
    );
};
