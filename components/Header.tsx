import React, { useState, useEffect } from 'react';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';

const Logo: React.FC = () => (
  <div className="flex items-center space-x-2">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
        <path d="M9 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 15h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 3l2 2l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 7l-2-2l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span className="font-bold text-xl text-secondary">ResumeFlow AI</span>
  </div>
);

interface HeaderProps {
  onStartTrialClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onStartTrialClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-neutral-700 hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="text-neutral-700 hover:text-primary transition-colors">Pricing</a>
            <a href="#faq" className="text-neutral-700 hover:text-primary transition-colors">FAQ</a>
            <a href="#contact" className="text-neutral-700 hover:text-primary transition-colors">Contact</a>
          </nav>
          <div className="hidden md:block">
            <Button onClick={onStartTrialClick}>Start Free Trial</Button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" className="z-50 relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                </svg>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
      {isMenuOpen && (
        <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden w-full bg-white/95 backdrop-blur-sm shadow-lg overflow-hidden"
        >
            <nav className="flex flex-col items-center space-y-1 p-4">
                <a href="#features" onClick={() => setIsMenuOpen(false)} className="w-full text-center text-neutral-700 hover:text-primary transition-colors py-2 rounded-md hover:bg-neutral-100">Features</a>
                <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="w-full text-center text-neutral-700 hover:text-primary transition-colors py-2 rounded-md hover:bg-neutral-100">Pricing</a>
                <a href="#faq" onClick={() => setIsMenuOpen(false)} className="w-full text-center text-neutral-700 hover:text-primary transition-colors py-2 rounded-md hover:bg-neutral-100">FAQ</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="w-full text-center text-neutral-700 hover:text-primary transition-colors py-2 rounded-md hover:bg-neutral-100">Contact</a>
                <div className="w-full pt-2">
                  <Button onClick={() => { onStartTrialClick(); setIsMenuOpen(false); }} className="w-full">Start Free Trial</Button>
                </div>
            </nav>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
};

export default Header;