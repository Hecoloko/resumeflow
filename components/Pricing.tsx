import React from 'react';
import Button from './Button';
import { motion } from 'framer-motion';

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const features = [
    'Unlimited Users',
    'AI Resume Parsing & Summaries',
    'Applicant Tracking System',
    'Email Support',
    'Secure Data Storage'
];

interface PricingProps {
    onStartTrialClick: () => void;
}

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

const Pricing: React.FC<PricingProps> = ({ onStartTrialClick }) => {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">Simple, transparent pricing</h2>
            <p className="mt-4 text-lg text-neutral-700 max-w-2xl mx-auto">One plan. Everything you need. No hidden fees.</p>
        </motion.div>
        <motion.div 
            className="max-w-md mx-auto bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
        >
            <div className="p-8">
                <h3 className="text-2xl font-semibold text-secondary text-center mb-2">Company Plan</h3>
                <p className="text-center text-neutral-600 mb-6">Perfect for teams of all sizes.</p>
                <div className="text-center my-6">
                    <span className="text-5xl font-extrabold text-secondary">$29.99</span>
                    <span className="text-lg text-neutral-600">/month</span>
                </div>
                <p className="text-center text-sm text-neutral-500 mb-8">Per company, billed after your 14-day free trial.</p>
                
                <ul className="space-y-4 mb-8">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                            <CheckIcon />
                            <span className="ml-3 text-neutral-800">{feature}</span>
                        </li>
                    ))}
                </ul>
                
                <Button onClick={onStartTrialClick} className="w-full py-3 text-base">
                    Start Your 14-Day Free Trial
                </Button>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;