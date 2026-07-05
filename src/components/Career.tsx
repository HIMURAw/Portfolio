import { useLanguage } from "../context/LanguageProvider";
import "./styles/Career.css";

const Career = () => {
  const { t } = useLanguage();

  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          {t.career.title} <span>&</span>
          <br /> {t.career.experience}
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>{t.career.role_1}</h4>
                <h5>{t.career.company_1}</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>{t.career.desc_1}</p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>{t.career.role_2}</h4>
                <h5>{t.career.company_2}</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>{t.career.desc_2}</p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>{t.career.role_3}</h4>
                <h5>{t.career.company_3}</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>{t.career.desc_3}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
