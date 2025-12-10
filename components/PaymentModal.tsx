import React, { useState, useEffect, FormEvent } from 'react';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Reset form state when modal closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(false);
      }, 300); // Wait for exit animation
      return () => clearTimeout(timer);
    }
  }, [isOpen])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSuccess) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Close modal after success message
        setTimeout(onClose, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl w-full max-w-md m-4 p-6 sm:p-8 relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-8"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <motion.path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </svg>
                    <h2 className="text-2xl font-bold text-secondary">Success!</h2>
                    <p className="text-neutral-600 mt-2">Welcome aboard! Your trial has started.</p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-600 transition-colors"
                    aria-label="Close"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-secondary mb-2">Start your 14-day free trial</h2>
                    <p className="text-neutral-600 mb-6">You won't be charged until after your trial period ends.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="nameOnCard" className="block text-sm font-medium text-neutral-700 mb-1">Name on Card</label>
                        <input type="text" id="nameOnCard" name="nameOnCard" placeholder="John M. Doe" className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                      </div>
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-neutral-700 mb-1">Card Number</label>
                        <input type="text" id="cardNumber" name="cardNumber" placeholder="•••• •••• •••• ••••" className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                      </div>
                      <div className="flex space-x-4">
                        <div className="w-1/2">
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-neutral-700 mb-1">Expiry Date</label>
                          <input type="text" id="expiryDate" name="expiryDate" placeholder="MM / YY" className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                        </div>
                        <div className="w-1/2">
                          <label htmlFor="cvc" className="block text-sm font-medium text-neutral-700 mb-1">CVC</label>
                          <input type="text" id="cvc" name="cvc" placeholder="123" className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Button type="submit" className="w-full py-3 text-base" disabled={isSubmitting}>
                          {isSubmitting ? (
                              <div className="flex items-center justify-center">
                                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                  Processing...
                              </div>
                          ) : 'Start Free Trial'}
                      </Button>
                    </div>
                     <p className="text-xs text-neutral-500 mt-4 text-center">
                      By clicking "Start Free Trial", you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
