import React, { useState, useContext, useEffect } from "react";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineDownload,
  AiOutlineInstagram,
  AiOutlineMail,
} from "react-icons/ai";
import { Button, Input, Textarea } from "../../components/form";
import { Page } from "../../components/Page";
import { useLanguage, NavbarContext } from "../../context";
import { blue, green, pink, red, yellow } from "../../utils";
import {
  ContactForm,
  ContactWrapper,
  DownloadButton,
  IconButton,
} from "./Contact.styled";

import { useInView } from "react-intersection-observer";

export const Contact = () => {
  const { t } = useLanguage();
  const setPage = useContext(NavbarContext);
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) setPage("contact");
  }, [inView, setPage]);

  const [form, setFormState] = useState({ name: "", email: "", message: "" });
  return (
    <div ref={ref}>
      <Page header={t("contact.header")} id="contact">
        <ContactWrapper>
          <ContactForm
            action="https://formspree.io/f/movdrzbd"
            method="POST"
            name="contact"
            id="contactform"
          >
            <Input
              placeholder={t("contact.placeholders.name")}
              type="text"
              name="name"
              onChange={(e) => {
                setFormState((prev) => ({ ...prev, name: e.target.value }));
              }}
              value={form.name}
            />
            <Input
              placeholder={t("contact.placeholders.email")}
              type="email"
              name="email"
              onChange={(e) => {
                setFormState((prev) => ({ ...prev, email: e.target.value }));
              }}
              value={form.email}
            />
            <Textarea
              lines={15}
              placeholder={t("contact.placeholders.message")}
              name="message"
              onChange={(e) => {
                setFormState((prev) => ({ ...prev, message: e.target.value }));
              }}
              value={form.message}
            />
          </ContactForm>
          <div className="buttons">
            <div className="socials">
              <a
                href="https://www.linkedin.com/in/umut-%C3%B6zt%C3%BCrk-224501344/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton bg={blue}>
                  <AiFillLinkedin size={40} />
                </IconButton>
              </a>

              <a href="mailto:zamtos79@gmail.com">
                <IconButton bg={green}>
                  <AiOutlineMail size={40} />
                </IconButton>
              </a>

              <a
                href="https://github.com/HIMURAw"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton bg={yellow}>
                  <AiFillGithub size={40} />
                </IconButton>
              </a>

              <a
                href="https://drive.google.com/file/d/1zp5khZY8XGJllzt2D8K0K47yqEk_Lkj5/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <DownloadButton bg={red} tooltip="Download">
                  <AiOutlineDownload size={40} />
                  <span>{t("contact.resume")}</span>
                </DownloadButton>
              </a>
            </div>
            <Button
              disabled={
                form.email.length <= 0 ||
                form.name.length <= 0 ||
                form.message.length <= 0
              }
              onClick={() => {
                document.forms["contact"].submit();
              }}
            >
              {t("contact.submit")}
            </Button>
          </div>
        </ContactWrapper>
      </Page>
    </div>
  );
};
