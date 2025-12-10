import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Upload Resume',
    description: 'Simply drag and drop or upload resumes in any common format. Our system gets to work instantly.'
  },
  {
    number: '02',
    title: 'Get AI Insights',
    description: 'Receive a structured summary, skill analysis, and key highlights for every candidate in seconds.'
  },
  {
    number: '03',
    title: 'Track & Decide',
    description: 'Manage all your applicants in one clean interface. Move them through stages and collaborate with your team.'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">Get started in 3 simple steps</h2>
          <p className="mt-4 text-lg text-neutral-700 max-w-2xl mx-auto">Hiring has never been this easy and efficient.</p>
        </motion.div>
        <div className="relative">
          <motion.div
            className="hidden md:block absolute top-10 left-0 w-full h-px bg-neutral-200"
            aria-hidden="true"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            style={{ transformOrigin: 'left' }}
            variants={lineVariants}
          />
          <motion.div
            className="relative grid gap-12 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {steps.map((step) => (
              <motion.div key={step.number} variants={itemVariants} className="text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 flex items-center justify-center bg-white border-2 border-neutral-300 rounded-full text-2xl font-bold text-primary relative z-10">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-3">{step.title}</h3>
                <p className="text-neutral-700">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;