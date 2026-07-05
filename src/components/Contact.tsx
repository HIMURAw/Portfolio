import { useState } from "react";
import { MdArrowOutward, MdCopyright, MdSend } from "react-icons/md";
import { useLanguage } from "../context/LanguageProvider";
import "./styles/Contact.css";

const Contact = () => {
  const { t, language } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("_captcha", "false"); // Disable spam captcha for seamless user flow

    fetch("https://formsubmit.co/ajax/zamtos79@gmail.com", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          setSubmitStatus("success");
          (e.target as HTMLFormElement).reset();
        } else {
          setSubmitStatus("error");
        }
      })
      .catch(() => {
        setSubmitStatus("error");
      })
      .finally(() => {
        setSubmitting(false);
        // Clear alert after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      });
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>{t.contact.title}</h3>
        <div className="contact-flex">
          {/* Email Contact Form (Left Side) */}
          <div className="contact-form-box">
            <h4>
              {language === "tr" ? "Bana Ulaşın" : "Send Message"}
            </h4>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={language === "tr" ? "Adınız Soyadınız" : "Your Name"}
                  data-cursor="disable"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={language === "tr" ? "E-posta Adresiniz" : "Your Email"}
                  data-cursor="disable"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder={language === "tr" ? "Konu" : "Subject"}
                  data-cursor="disable"
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={language === "tr" ? "Mesajınız" : "Your Message"}
                  data-cursor="disable"
                />
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                className="form-submit-btn"
                data-cursor="disable"
              >
                {submitting ? (
                  language === "tr" ? "Gönderiliyor..." : "Sending..."
                ) : (
                  <>
                    {language === "tr" ? "Gönder" : "Send"} <MdSend />
                  </>
                )}
              </button>

              {/* Status Indicators */}
              {submitStatus === "success" && (
                <div className="form-alert success">
                  {language === "tr"
                    ? "Mesajınız başarıyla gönderildi! Teşekkürler."
                    : "Your message has been sent successfully! Thank you."}
                </div>
              )}
              {submitStatus === "error" && (
                <div className="form-alert error">
                  {language === "tr"
                    ? "Mesaj gönderilirken hata oluştu. Lütfen tekrar deneyin."
                    : "An error occurred while sending. Please try again."}
                </div>
              )}
            </form>
          </div>

          {/* Contact Details (Right Side) */}
          <div className="contact-details-box">
            <div className="contact-box">
              <h4>{t.contact.email}</h4>
              <p>
                <a href="mailto:zamtos79@gmail.com" data-cursor="disable">
                  zamtos79@gmail.com
                </a>
              </p>
              <h4>{t.contact.phone}</h4>
              <p>
                <a href="tel:+905528330883" data-cursor="disable">
                  +90 (552) 833 08 83
                </a>
              </p>
            </div>
            <div className="contact-box">
              <h4>{t.contact.social}</h4>
              <a
                href="https://github.com/HIMURAw"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Github <MdArrowOutward />
              </a>
              <a
                href="https://linkedin.com/in/umutttt"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Linkedin <MdArrowOutward />
              </a>
              <a
                href="https://x.com/Himura"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Twitter <MdArrowOutward />
              </a>
              <a
                href="https://instagram.com/umutozturk.sl"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Instagram <MdArrowOutward />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="contact-footer">
          <div className="contact-box">
            <h2>
              {language === "tr" ? (
                <>
                  <span>Umut Öztürk</span> tarafından <br /> Tasarlandı ve Geliştirildi
                </>
              ) : (
                <>
                  Designed and Developed <br /> by <span>Umut Öztürk</span>
                </>
              )}
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
