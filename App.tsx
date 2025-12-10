import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Features from './components/Features';
import LiveDemo from './components/LiveDemo';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import ContactForm from './components/ContactForm';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import PaymentModal from './components/PaymentModal';

const App: React.FC = () => {
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  const handleOpenPaymentModal = () => setPaymentModalOpen(true);
  const handleClosePaymentModal = () => setPaymentModalOpen(false);

  return (
    <div className="bg-neutral-100 min-h-screen text-neutral-900 font-sans antialiased overflow-x-hidden">
      <Header onStartTrialClick={handleOpenPaymentModal} />
      <main>
        <Hero onStartTrialClick={handleOpenPaymentModal} />
        <TrustedBy />
        <Features />
        <LiveDemo />
        <HowItWorks />
        <Pricing onStartTrialClick={handleOpenPaymentModal} />
        <Testimonials />
        <Faq />
        <ContactForm />
        <CtaSection onStartTrialClick={handleOpenPaymentModal} />
      </main>
      <Footer />
      <PaymentModal isOpen={isPaymentModalOpen} onClose={handleClosePaymentModal} />
    </div>
  );
};

export default App;