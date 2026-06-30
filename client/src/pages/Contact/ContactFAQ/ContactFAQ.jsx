import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuPlus, LuMinus } from "react-icons/lu";

import Section from "../../../components/ui/Section/Section";
import SectionSubTitle from "../../../components/ui/SectionSubTitle/SectionSubTitle";

import styles from "./ContactFAQ.module.css";

const faqs = [
  {
    question: "How quickly will you reply?",
    answer:
      "I usually respond within 24–48 hours. If you've reached out regarding a commission or course, I'll get back to you as soon as possible.",
  },
  {
    question: "Can I ask questions before purchasing a course?",
    answer:
      "Absolutely! Feel free to contact me if you'd like to know more about the course content, skill level, or whether it's the right fit for you.",
  },
  {
    question: "Do you accept custom portrait commissions?",
    answer:
      "Yes! I create personalised coloured pencil portraits based on your reference photos. You can contact me with your requirements, and I'll guide you through the process.",
  },
  {
    question: "Where are you based?",
    answer:
      "I'm based in West Bengal, India, and I work with art enthusiasts and clients from around the world through online communication.",
  },
  {
    question: "What is the best way to contact you?",
    answer:
      "The contact form on this page is the quickest way to reach me. You can also connect with me through Instagram or WhatsApp for general enquiries.",
  },
];

export default function ContactFAQ() {
  const [active, setActive] = useState(null);

  return (
    <Section>
      <div className={styles.heading}>
        <SectionSubTitle>Still Have Questions?</SectionSubTitle>

        {/* <SectionTitle>Everything You Might Want To Know</SectionTitle> */}

        {/* <p className={styles.description}>
          Still have questions? Here are the answers to the most common ones.
        </p> */}
      </div>

      <div className={styles.list}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.item}>
            <button
              className={styles.question}
              onClick={() => setActive(active === index ? null : index)}
            >
              <span>{faq.question}</span>

              {active === index ? (
                <LuMinus />
              ) : (
                <motion.div
                  animate={{
                    rotate: active === index ? 45 : 0,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <LuPlus />
                </motion.div>
              )}
            </button>

            <AnimatePresence>
              {active === index && (
                <motion.div
                  className={styles.answer}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}
