import React from 'react';
import { motion } from 'framer-motion';

const featureData = [
  {
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    ),
    title: 'AI-Powered Parsing',
    description: 'Upload any resume (PDF, DOCX) and let our AI instantly extract key information, saving you hours of manual data entry.'
  },
  {
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    ),
    title: 'Instant Summaries',
    description: "Get concise, AI-generated summaries of each candidate's skills, experience, and qualifications. Make faster, more informed decisions."
  },
  {
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    ),
    title: 'Simple Tracking Kanban',
    description: 'Move candidates through your hiring pipeline with a simple drag-and-drop interface. From "Applied" to "Hired", visualize every step.'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
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

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">A smarter way to hire</h2>
            <p className="mt-4 text-lg text-neutral-700 max-w-2xl mx-auto">Focus on candidates, not on paperwork. ResumeFlow AI automates the tedious parts of hiring.</p>
        </motion.div>
        <motion.div 
          className="grid gap-8 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {featureData.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-light mb-5">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">{feature.title}</h3>
              <p className="text-neutral-700">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;