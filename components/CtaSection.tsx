import React from 'react';
import Button from './Button';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
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

interface CtaSectionProps {
    onStartTrialClick: () => void;
}

const CtaSection: React.FC<CtaSectionProps> = ({ onStartTrialClick }) => {
  return (
    <section className="py-20 sm:py-28">
        <motion.div 
            className="container mx-auto px-4 sm:px-6 lg:px-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
        >
            <div className="max-w-2xl mx-auto text-center">
                <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-secondary">Ready to revolutionize your hiring process?</motion.h2>
                <motion.p variants={itemVariants} className="mt-4 text-lg text-neutral-700">
                    Join hundreds of companies that have simplified their recruitment workflow.
                    Start your free 14-day trial today. No credit card required.
                </motion.p>
                <motion.div variants={itemVariants} className="mt-8">
                    <Button onClick={onStartTrialClick} className="px-10 py-4 text-lg">Get Started For Free</Button>
                </motion.div>
            </div>
        </motion.div>
    </section>
  );
};

export default CtaSection;