import Section from "../../components/ui/Section/Section";
import SectionTitle from "../../components/ui/SectionTitle/SectionTitle";
import SectionSubTitle from "../../components/ui/SectionSubTitle/SectionSubTitle";
import PrimaryButton from "../../components/ui/PrimaryButton/PrimaryButton";
import PageHero from "../../components/shared/PageHero/PageHero";
import HeroImage from "../../assets/images/hero/courses-hero.jpg";

import botanical from "../../assets/textures/botanical.png";

import { LuMail, LuInstagram, LuMessageCircle, LuMapPin } from "react-icons/lu";

import styles from "./Contact.module.css";
import Container from "../../components/ui/Container/Container";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import ContactFAQ from "./ContactFAQ/ContactFAQ";
import {
  showSuccess,
  showError,
} from "../../utils/toast";

const contactInfo = [
  {
    icon: <LuMail />,
    title: "Email",
    value: "kashmirajha2001@gmail.com",
    link: "mailto:kashmirajha2001@gmail.com",
  },
  {
    icon: <LuInstagram />,
    title: "Instagram",
    value: "@artsbykash",
    link: "https://www.instagram.com/artsbykash/",
  },
  {
    icon: <LuMessageCircle />,
    title: "WhatsApp",
    value: "+91 XXXXX XXXXX",
    link: "https://wa.me/918420333594",
  },
  {
    icon: <LuMapPin />,
    title: "Location",
    value: "West Bengal, India",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setStatus("success");
      showSuccess("Message Sent Successfully!");

      setForm({
        from_name: "",
        from_email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      setStatus("error");
    }

    setLoading(false);
  };

  return (
    <>
      <PageHero title="Contact" breadcrumb="Let's connect" image={HeroImage} />
      <Section>
        <Container>
          <div className={styles.heading}>
            {/* <SectionSubTitle>Let's Connect</SectionSubTitle> */}

            <SectionTitle>I'd Love To Hear From You</SectionTitle>

            <p className={styles.description}>
              Whether you have a question about commissions, courses, or simply
              want to say hello, feel free to reach out. I'll get back to you as
              soon as I can.
            </p>
          </div>

          <div className={styles.wrapper}>
            {/* FORM */}

            <div className={styles.formCard}>
              <img src={botanical} alt="" className={styles.botanical} />

              <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="from_name"
                    value={form.from_name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                  {/* <input type="text" placeholder="Your name" /> */}
                </div>

                <div className={styles.inputGroup}>
                  <label>Email Address</label>
                  {/* <input type="email" placeholder="you@example.com" /> */}
                  <input
                    type="email"
                    name="from_email"
                    value={form.from_email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Subject</label>
                  {/* <input type="text" placeholder="How can I help?" /> */}
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can I help?"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Message</label>
                  <textarea
                    rows="3"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    required
                  />
                  {/* <textarea
                    rows="3"
                    placeholder="Write your message..."
                  ></textarea> */}
                </div>

                {/* <PrimaryButton type="submit">Send Message</PrimaryButton> */}
                <PrimaryButton
                  type="submit"
                  disabled={loading || status === "success"}
                >
                  {loading
                    ? "Sending..."
                    : status === "success"
                      ? "Message Sent ✓"
                      : "Send Message"}
                </PrimaryButton>
                {status === "success" && (
                  <div className={styles.successBanner}>
                    <div className={styles.successIcon}>✓</div>
                    <div>
                      <p>
                        Thanks for reaching out. I'll get back to you as soon as
                        possible.
                      </p>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div className={styles.errorBanner}>
                    <div className={styles.errorIcon}>!</div>

                    <div>
                      <h4>Something went wrong</h4>
                      <p>Please try again in a few moments.</p>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* CONTACT INFO */}

            <div className={styles.info}>
              {contactInfo.map((item, index) => (
                <div key={index} className={styles.infoCard}>
                  <div className={styles.icon}>{item.icon}</div>

                  <div>
                    <h3>{item.title}</h3>

                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <ContactFAQ/>
    </>
  );
}
