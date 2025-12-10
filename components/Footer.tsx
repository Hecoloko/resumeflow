import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-neutral-600">
            &copy; {currentYear} ResumeFlow AI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-neutral-600 hover:text-primary">Terms of Service</a>
            <a href="#" className="text-sm text-neutral-600 hover:text-primary">Privacy Policy</a>
            <a href="#contact" className="text-sm text-neutral-600 hover:text-primary">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;