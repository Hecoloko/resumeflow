import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  { name: 'Star', path: <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /> },
  { name: 'CheckCircle', path: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
  { name: 'Layers', path: <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L12 15.25l5.571-3m0 0l4.179-2.25L12 9.75l-5.571-3z" /> },
  { name: 'InfoCircle', path: <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /> },
  { name: 'ArrowUp', path: <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" /> },
  { name: 'Moon', path: <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /> },
  { name: 'Star2', path: <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /> },
  { name: 'CheckCircle2', path: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
];

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

const marqueeVariants = {
    animate: {
        x: [0, '-100%'],
        transition: {
            x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
            },
        },
    },
};

const TrustedBy: React.FC = () => {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
            className="text-center text-sm font-semibold text-neutral-600 tracking-wider uppercase"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
        >
          Trusted by innovative teams worldwide
        </motion.h2>
        <div className="mt-8 w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <motion.ul 
                className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_svg]:max-w-none animate-infinite-scroll"
                variants={marqueeVariants}
                animate="animate"
                >
                {logos.map((logo, index) => (
                    <li key={`${logo.name}-${index}`}>
                        <svg
                            className="h-8 w-auto text-neutral-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            aria-label={logo.name}
                        >
                            {logo.path}
                        </svg>
                    </li>
                ))}
            </motion.ul>
            <motion.ul 
                className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_svg]:max-w-none"
                aria-hidden="true"
                variants={marqueeVariants}
                animate="animate"
            >
                {logos.map((logo, index) => (
                    <li key={`${logo.name}-2-${index}`}>
                        <svg
                            className="h-8 w-auto text-neutral-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            aria-label={logo.name}
                        >
                            {logo.path}
                        </svg>
                    </li>
                ))}
            </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;