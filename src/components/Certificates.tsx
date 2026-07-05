import { useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../context/LanguageProvider";
import { FaAward, FaFilePdf, FaEye, FaDownload, FaXmark, FaGraduationCap, FaCertificate } from "react-icons/fa6";
import "./styles/Certificates.css";

interface CertificateItem {
  id: string;
  titleTr: string;
  titleEn: string;
  issuer: string;
  dateTr: string;
  dateEn: string;
  file: string;
  type: "academic" | "course" | "professional";
}

const certificatesData: CertificateItem[] = [
  {
    id: "llm-workshop",
    titleTr: "Büyük Dil Modelleri (LLM) ile Sesli Asistan Atölyesi",
    titleEn: "Voice Assistant Workshop with Large Language Models (LLM)",
    issuer: "BTK Akademi",
    dateTr: "2026",
    dateEn: "2026",
    file: "Büyük_Dil_Modelleri_(LLM)_ile_Sesli_Asistan_Atölyesi_Sertifika.pdf",
    type: "professional"
  },
  {
    id: "english-test",
    titleTr: "OLS İngilizce Dil Değerlendirme (A2-B1)",
    titleEn: "OLS English Placement Assessment (A2-B1)",
    issuer: "European Commission",
    dateTr: "2026",
    dateEn: "2026",
    file: "English_Placement_Test_Certificate.pdf",
    type: "academic"
  },
  {
    id: "nodejs-cert",
    titleTr: "Sıfırdan Profesyonelle Node.js Eğitimi",
    titleEn: "Complete Node.js Developer Course",
    issuer: "Udemy",
    dateTr: "2025",
    dateEn: "2025",
    file: "nodejscertficete.pdf",
    type: "course"
  },
  {
    id: "udemy-fullstack",
    titleTr: "Komple Uygulamalı Web Geliştirme",
    titleEn: "Complete Application Web Development",
    issuer: "Udemy",
    dateTr: "2025",
    dateEn: "2025",
    file: "udemy-full-stack-certficete.pdf",
    type: "course"
  }
];

const Certificates = () => {
  const { language } = useLanguage();
  const [selectedDoc, setSelectedDoc] = useState<{ id: string; title: string; file: string; type: "cv" | "cert" } | null>(null);

  const handleOpenViewer = (id: string, title: string, file: string, type: "cv" | "cert") => {
    setSelectedDoc({ id, title, file, type });
  };

  const handleCloseViewer = () => {
    setSelectedDoc(null);
  };

  return (
    <div className="certificates-section section-container" id="certificates">
      <h2>
        {language === "tr" ? (
          <>
            SERTİFİKALARIM <span>& CV</span>
          </>
        ) : (
          <>
            CERTIFICATES <span>& CV</span>
          </>
        )}
      </h2>
      <p className="certs-subtitle">
        {language === "tr"
          ? "Kazandığım başarı sertifikalarına ve güncel özgeçmişime (CV) buradan göz atabilirsiniz."
          : "Explore my achievement certificates and view or download my latest resume (CV)."}
      </p>

      <div className="certs-cv-container">
        {/* CV Card */}
        <div className="cv-showcase-card">
          <div className="cv-icon-wrap">
            <FaFilePdf />
          </div>
          <div className="cv-details">
            <h3>{language === "tr" ? "GÜNCEL ÖZGEÇMİŞİM (CV)" : "MY LATEST RESUME (CV)"}</h3>
            <p>
              {language === "tr"
                ? "Eğitim bilgilerim, projelerim ve detaylı teknik yeteneklerimin yer aldığı özgeçmiş dosyam."
                : "My professional resume containing education history, projects, and detailed technical skills."}
            </p>
            <div className="cv-actions">
              <button 
                onClick={() => handleOpenViewer("cv", language === "tr" ? "Umut Öztürk - Özgeçmiş" : "Umut Ozturk - Resume", "CV.docx", "cv")} 
                className="btn-view"
                data-cursor="disable"
              >
                <FaEye /> {language === "tr" ? "Görüntüle" : "View CV"}
              </button>
              <a 
                href="/cv/CV.docx" 
                download="Umut_Ozturk_CV.docx" 
                className="btn-download"
                data-cursor="disable"
              >
                <FaDownload /> {language === "tr" ? "İndir (DOCX)" : "Download (DOCX)"}
              </a>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="certs-grid">
          {certificatesData.map((cert) => (
            <div className="cert-card" key={cert.id}>
              <div className="cert-card-top">
                <div className="cert-icon-box">
                  {cert.type === "academic" ? <FaGraduationCap /> : cert.type === "professional" ? <FaCertificate /> : <FaAward />}
                </div>
                <span className="cert-date">{language === "tr" ? cert.dateTr : cert.dateEn}</span>
              </div>
              <h4 className="cert-title">{language === "tr" ? cert.titleTr : cert.titleEn}</h4>
              <p className="cert-issuer">{cert.issuer}</p>
              
              <button 
                onClick={() => handleOpenViewer(cert.id, language === "tr" ? cert.titleTr : cert.titleEn, cert.file, "cert")}
                className="cert-view-btn"
                data-cursor="disable"
              >
                <FaEye /> {language === "tr" ? "Görüntüle" : "View PDF"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Premium In-Site Document Viewer Modal */}
      {selectedDoc && createPortal(
        <div className="doc-viewer-overlay" onClick={handleCloseViewer}>
          <div className="doc-viewer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="viewer-header">
              <h4>{selectedDoc.title}</h4>
              <div className="viewer-controls">
                <a 
                  href={selectedDoc.type === "cv" ? "/cv/CV.docx" : `/certificate/${selectedDoc.file}`} 
                  download={selectedDoc.type === "cv" ? "Umut_Ozturk_CV.docx" : selectedDoc.file} 
                  className="control-btn download-btn"
                  title={language === "tr" ? "İndir" : "Download"}
                  data-cursor="disable"
                >
                  <FaDownload />
                </a>
                <button 
                  onClick={handleCloseViewer} 
                  className="control-btn close-btn"
                  title={language === "tr" ? "Kapat" : "Close"}
                  data-cursor="disable"
                >
                  <FaXmark />
                </button>
              </div>
            </div>

            <div className="viewer-content">
              {selectedDoc.type === "cv" ? (
                /* Interactive Beautiful HTML CV Replica for DOCX */
                <div className="interactive-cv">
                  <div className="cv-header">
                    <h2>UMUT ÖZTÜRK</h2>
                    <p className="cv-title">
                      {language === "tr" 
                        ? "Bilişim Teknolojileri Öğrencisi | Yazılım Geliştirme | Teknik Destek | Donanım" 
                        : "Information Technology Student | Software Development | Technical Support | Hardware"}
                    </p>
                    <div className="cv-meta">
                      <span>Ankara, Türkiye</span>
                      <span>•</span>
                      <span>zamtos79@gmail.com</span>
                      <span>•</span>
                      <span>+90 (552) 833 08 83</span>
                    </div>
                    <div className="cv-meta-links" style={{ marginTop: "8px", fontSize: "13px", color: "var(--accentColor)" }}>
                      <a href="https://linkedin.com/in/umutttt" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none", marginRight: "12px" }}>LinkedIn</a>
                      <a href="https://github.com/HIMURAw" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>GitHub</a>
                    </div>
                  </div>

                  <div className="cv-body-grid">
                    <div className="cv-col-left">
                      <section className="cv-section">
                        <h4>{language === "tr" ? "PROFESYONEL ÖZET" : "SUMMARY"}</h4>
                        <p style={{ fontSize: "13px", lineHeight: "1.6", margin: "0", color: "#adacac" }}>
                          {language === "tr"
                            ? "Yazılım geliştirme alanında aktif olarak çalışan, C#, JavaScript, TypeScript, HTML, CSS ve React gibi teknolojilerde deneyim sahibi bir geliştiricidir. Full-stack web geliştirme, oyun sunucusu geliştirme ve freelance projeler üzerinde çalışarak modern, performans odaklı ve responsive web uygulamaları geliştirme konusunda pratik kazanmıştır."
                            : "An active developer in software development with experience in C#, JavaScript, TypeScript, HTML, CSS, and React. Gained practical experience in modern, performance-oriented, and responsive web applications by working on full-stack web development, game server development, and freelance projects."}
                        </p>
                      </section>

                      <section className="cv-section" style={{ marginTop: "25px" }}>
                        <h4>{language === "tr" ? "EĞİTİM" : "EDUCATION"}</h4>
                        <div className="cv-item">
                          <h5>
                            {language === "tr" 
                              ? "Dikmen Mesleki ve Teknik Anadolu Lisesi" 
                              : "Dikmen Vocational and Technical High School"}
                          </h5>
                          <p className="cv-sub">
                            {language === "tr" 
                              ? "Bilişim Teknolojileri (Yazılım Geliştirme Dalı)" 
                              : "Information Technology (Software Development)"}
                          </p>
                          <p className="cv-date">2023 - 2027 ({language === "tr" ? "Devam Ediyor" : "Present"})</p>
                        </div>
                      </section>

                      <section className="cv-section" style={{ marginTop: "25px" }}>
                        <h4>{language === "tr" ? "DİLLER" : "LANGUAGES"}</h4>
                        <p style={{ fontSize: "13px", color: "#adacac", margin: "0" }}>
                          {language === "tr" ? "Türkçe (Ana Dil) | İngilizce (A2-B1)" : "Turkish (Native) | English (A2-B1)"}
                        </p>
                      </section>
                    </div>

                    <div className="cv-col-right">
                      <section className="cv-section">
                        <h4>{language === "tr" ? "TEKNİK YETKİNLİKLER" : "TECHNICAL SKILLS"}</h4>
                        <div className="cv-skills-wrap" style={{ marginBottom: "20px" }}>
                          <span>C#</span>
                          <span>Lua</span>
                          <span>Python</span>
                          <span>JavaScript</span>
                          <span>TypeScript</span>
                          <span>React</span>
                          <span>Next.js</span>
                          <span>HTML5 & CSS3</span>
                          <span>Tailwind CSS</span>
                          <span>Git / GitHub</span>
                        </div>
                      </section>

                      <section className="cv-section">
                        <h4>{language === "tr" ? "PROJELER & DENEYİM" : "PROJECTS & EXPERIENCE"}</h4>
                        <div className="cv-item">
                          <h5>{language === "tr" ? "Yapay Zeka Destekli E-Ticaret" : "AI-Powered E-Commerce"}</h5>
                          <p className="cv-desc">
                            {language === "tr"
                              ? "Ürün öneri sistemi, kullanıcı etkileşimi ve akıllı alışveriş deneyimi sunan platform."
                              : "Product recommendation system, user interaction, and smart shopping experience platform."}
                          </p>
                        </div>
                        <div className="cv-item">
                          <h5>{language === "tr" ? "AI Tabanlı Asistan Servisi" : "AI-Based Assistant Service"}</h5>
                          <p className="cv-desc">
                            {language === "tr"
                              ? "Günlük kullanım süreçlerini kolaylaştıran yapay zeka entegrasyonu."
                              : "AI integration simplifying daily routines and user operations."}
                          </p>
                        </div>
                        <div className="cv-item">
                          <h5>{language === "tr" ? "Yangın Dedektörü Kontrol Sistemi" : "Fire Detector Maintenance System"}</h5>
                          <p className="cv-desc">
                            {language === "tr"
                              ? "Endüstriyel cihaz takibi, bakım planlama ve raporlama kontrol sistemi."
                              : "Industrial device tracking, maintenance planning, and reporting system."}
                          </p>
                        </div>
                        <div className="cv-item">
                          <h5>{language === "tr" ? "Lua Oyun Sunucusu Geliştirme" : "Lua Game Server Development"}</h5>
                          <p className="cv-desc">
                            {language === "tr"
                              ? "FiveM sunucuları için script geliştirme, oyun içi sistem tasarımı ve yönetimi."
                              : "FiveM server scripting, in-game mechanics design, and server administration."}
                          </p>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              ) : (
                /* Embed Actual PDF in iframe inside modal for certificates */
                <div className="pdf-iframe-container" style={{ width: "100%", height: "650px", overflow: "hidden", borderRadius: "8px" }}>
                  <iframe 
                    src={`/certificate/${selectedDoc.file}#toolbar=0`} 
                    width="100%" 
                    height="100%" 
                    style={{ border: "none" }}
                    title={selectedDoc.title}
                  />
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Certificates;
