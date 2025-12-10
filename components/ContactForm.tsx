import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

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

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill out all fields.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000); 
    }, 1500);
  };

  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">Get in Touch</h2>
          <p className="mt-4 text-lg text-neutral-700">We'd love to hear from you. Send us a message and we'll get back to you shortly.</p>
        </motion.div>

        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg border border-neutral-200"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mb-4 text-center p-4 bg-green-100 text-green-800 rounded-md"
                >
                  Thank you for your message! We'll be in touch soon.
                </motion.div>
              ) : null}
            </AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="John Doe" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">Subject</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="e.g., Enterprise Plan Inquiry" required />
            </div>
            <div className="mt-6">
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
              <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Your message here..." required></textarea>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-6 text-right">
              <Button type="submit" className="px-8 py-3 text-base" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : 'Send Message'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;