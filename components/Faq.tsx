import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "What happens after my 14-day trial?",
    answer: "If you choose to continue using ResumeFlow AI, you'll be asked to enter your payment details. Your first charge will occur at the end of the trial period. If you cancel before then, you won't be charged."
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Absolutely. You can cancel your subscription at any time from your account settings. You will retain access until the end of your current billing period."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, data security is our top priority. We use industry-standard encryption for data in transit and at rest. All resume data is processed securely and stored in a compliant cloud environment."
  },
  {
    question: "What resume file types are supported?",
    answer: "Our AI can parse the most common resume formats, including PDF, Microsoft Word (.doc, .docx), and plain text files (.txt)."
  },
  {
    question: "Do you offer enterprise plans?",
    answer: "Yes, we do. For large organizations with custom needs, please contact our sales team to discuss an enterprise plan tailored to your requirements."
  }
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: 'spring' }}
        >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-neutral-700">Have questions? We've got answers.</p>
        </motion.div>
        <div>
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-neutral-200 py-4">
              <button
                className="w-full flex justify-between items-center text-left text-lg font-medium text-secondary"
                onClick={() => handleToggle(index)}
                aria-expanded={openIndex === index}
              >
                <span>{item.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className={`w-5 h-5 text-neutral-500`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence>
              {openIndex === index && (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-neutral-700">{item.answer}</p>
                  </motion.div>
              )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;