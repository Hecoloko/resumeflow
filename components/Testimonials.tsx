import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "ResumeFlow AI has cut down our initial screening time by over 70%. The AI summaries are spot-on and help us identify top candidates faster than ever before.",
    name: 'Sarah Johnson',
    title: 'Lead Recruiter, TechCorp',
  },
  {
    quote: "As a small startup, we don't have a dedicated HR team. This tool is a lifesaver. It's intuitive, powerful, and has completely streamlined our hiring process.",
    name: 'Michael Chen',
    title: 'Founder, Innovate Inc.',
  },
  {
    quote: "The ability to just upload a resume and get a structured, digestible summary is a game-changer. Collaboration with the hiring team has become seamless.",
    name: 'Emily Rodriguez',
    title: 'Hiring Manager, DataDriven LLC',
  }
];

const avatars = [
    <svg key="1" className="h-12 w-12 rounded-full bg-blue-100 text-primary p-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>,
    <svg key="2" className="h-12 w-12 rounded-full bg-green-100 text-green-600 p-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>,
    <svg key="3" className="h-12 w-12 rounded-full bg-purple-100 text-purple-600 p-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>,
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

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">Loved by hiring managers worldwide</h2>
          <p className="mt-4 text-lg text-neutral-700 max-w-2xl mx-auto">Don't just take our word for it. Here's what our customers are saying.</p>
        </motion.div>
        <motion.div 
          className="grid gap-8 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-lg border border-neutral-200 flex flex-col shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex-grow">
                <svg className="w-8 h-8 text-neutral-300 mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.983 3v7.391c0 2.9-2.35 5.258-5.25 5.258h-1.5V21h1.5c4.518 0 8.25-3.696 8.25-8.25V3h-3zM21 3v7.391c0 2.9-2.35 5.258-5.25 5.258h-1.5V21h1.5c4.518 0 8.25-3.696 8.25-8.25V3h-3z"/></svg>
                <p className="text-neutral-700 italic">"{testimonial.quote}"</p>
              </div>
              <div className="mt-6 flex items-center">
                {avatars[index]}
                <div className="ml-4">
                  <p className="font-semibold text-secondary">{testimonial.name}</p>
                  <p className="text-neutral-600 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
