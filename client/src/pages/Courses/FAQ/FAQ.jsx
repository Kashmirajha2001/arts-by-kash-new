import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuPlus, LuMinus } from "react-icons/lu";

import Section from "../../../components/ui/Section/Section";
import SectionTitle from "../../../components/ui/SectionTitle/SectionTitle";
import SectionSubTitle from "../../../components/ui/SectionSubTitle/SectionSubTitle";

import styles from "./FAQ.module.css";

const faqs = [
  {
    question: "Is this course suitable for complete beginners?",
    answer:
      "Yes! This masterclass is designed to guide beginners step by step while also offering valuable techniques for intermediate artists.",
  },
  {
    question: "Will I have lifetime access to the course?",
    answer:
      "Yes. Once purchased, you'll have lifetime access to all current lessons and any future updates included in this course.",
  },
  {
    question: "What materials do I need?",
    answer:
      "A detailed materials list is provided inside the course. You can start with basic coloured pencils and gradually upgrade your supplies.",
  },
  {
    question: "Can I watch the lessons on my phone?",
    answer:
      "Absolutely! The course is fully responsive and can be accessed from your phone, tablet, laptop or desktop.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Yes. After completing the course, you'll receive a digital certificate of completion.",
  },
  {
    question: "How do I contact you if I have questions?",
    answer:
      "You can reach me anytime through the contact page or Instagram. I'll be happy to help with your learning journey.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState(null);

  return (
    <Section>
      <div className={styles.heading}>
        <SectionSubTitle>Frequently Asked Questions</SectionSubTitle>

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
