import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';

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
      stiffness: 100,
    },
  },
};

const BoyAvatar: React.FC = () => (
    <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
        <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
    </div>
);

const GirlAvatar: React.FC = () => (
    <div className="w-10 h-10 rounded-full bg-pink-100 flex-shrink-0 flex items-center justify-center">
        <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
    </div>
);

interface Candidate {
    id: number;
    name: string;
    title: string;
    summary: string;
    avatar: React.ReactNode;
    scheduled?: string;
}

const initialBoardState: { [key: string]: Candidate[] } = {
    applied: [
        { id: 2, name: 'Hernan Cocjin', title: 'SEO & Digital Marketing Specialist', summary: '"A results-driven professional with div..."', avatar: <BoyAvatar /> },
        { id: 1, name: 'Alice Johnson', title: 'Senior Software Engineer', summary: '"Highly organized and goal-oriented..."', avatar: <GirlAvatar /> },
        { id: 3, name: 'Joan Saso', title: 'Accountant', summary: '', avatar: <GirlAvatar /> },
    ],
    screening: [
        { id: 5, name: 'Niño Santillan', title: 'Administrative Assistant', summary: '"Reliable Administrative and Virtual As..."', scheduled: 'Nov 19', avatar: <BoyAvatar /> },
        { id: 7, name: 'Simcha Pentelnick', title: 'UX Designer', summary: '', avatar: <BoyAvatar /> },
    ],
    interview: [
        { id: 9, name: 'Alan Turing', title: 'Project Manager', summary: '', avatar: <BoyAvatar /> },
        { id: 10, name: 'Ada Lovelace', title: 'Engineer', summary: '"Nino Carl G. Santillan is a reliable Ad..."', avatar: <GirlAvatar /> },
        { id: 4, name: 'Bob Williams', title: 'Data Scientist', summary: '', avatar: <BoyAvatar /> },
    ],
    hired: [
        { id: 11, name: 'Allesandro Celis', title: 'Marketing Lead', summary: '', avatar: <BoyAvatar /> },
    ],
};

const columnIcons = {
    applied: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    screening: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    interview: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    hired: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

interface CandidateCardProps {
    candidate: Candidate;
    stage: string;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, stage }) => {
    const isAlice = candidate.id === 1;

    // FIX: Combined all animation states into a single `variants` object to resolve the error
    // of having a duplicate 'animate' prop. This allows Framer Motion to handle
    // initial, exit, and state-change animations together.
    const cardVariants = {
        initial: {
            opacity: 0,
            y: 20
        },
        exit: {
            opacity: 0,
            scale: 0.95
        },
        default: {
            opacity: 1,
            y: 0,
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // shadow-sm
            borderColor: 'rgb(229 231 235)', // border-neutral-200
        },
        glowing: {
            opacity: 1,
            y: 0,
            boxShadow: '0 0 12px rgba(74, 222, 128, 0.5)', // green-400 glow
            borderColor: 'rgb(110 231 183)', // green-300
        },
        hiredGlow: {
            opacity: 1,
            y: 0,
            boxShadow: '0 0 25px rgba(74, 222, 128, 0.9)', // more intense green-400 glow
            borderColor: 'rgb(74 222 128)', // green-400
        }
    };

    const getGlowState = () => {
        if (!isAlice) return 'default';
        if (stage === 'hired') return 'hiredGlow';
        return 'glowing';
    };

    return (
        <motion.div
            layout
            initial="initial"
            animate={getGlowState()}
            exit="exit"
            className="bg-white p-3 rounded-lg text-left border"
            variants={cardVariants}
            custom={stage}
            transition={{
                layout: { type: 'spring', stiffness: 300, damping: 30 },
                boxShadow: { duration: 0.5, ease: 'easeInOut' },
                borderColor: { duration: 0.5, ease: 'easeInOut' }
            }}
        >
            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                     {candidate.avatar}
                    <div>
                        <p className="font-bold text-sm text-secondary capitalize">{candidate.name}</p>
                        <p className="text-xs text-neutral-600">{candidate.title}</p>
                    </div>
                </div>
                <div className="flex space-x-2 text-neutral-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </div>
            </div>
            {candidate.summary && <p className="text-xs text-neutral-700 mt-2 italic bg-neutral-100 p-2 rounded">{candidate.summary}</p>}
            {candidate.scheduled && 
                <div className="text-xs text-primary mt-2 flex items-center bg-primary-light rounded-full px-2 py-1 w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Scheduled: {candidate.scheduled}
                </div>
            }
        </motion.div>
    );
}

interface KanbanColumnProps {
    title: string;
    icon: React.ReactNode;
    count: number;
    children: React.ReactNode;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, icon, count, children }) => (
    <div className="flex flex-col bg-neutral-100 p-3 rounded-lg">
        <div className="flex items-center mb-4 text-neutral-800">
            {icon}
            <h3 className="font-semibold text-md capitalize">{title}</h3>
            <span className="ml-2 bg-neutral-200 text-neutral-600 text-xs font-bold px-2 py-0.5 rounded-full">{count}</span>
        </div>
        <div className="space-y-3 flex-1">
            {children}
        </div>
    </div>
);

const FakeDashboardUI: React.FC = () => {
    const [board, setBoard] = useState(initialBoardState);
    const animationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const runAnimationSequence = () => {
        const CANDIDATE_ID_TO_MOVE = 1; // Alice Johnson's ID

        // Step 1: Move from Applied to Screening
        setTimeout(() => {
            setBoard(prevBoard => {
                const appliedList = [...prevBoard.applied];
                const screeningList = [...prevBoard.screening];
                const candidateIndex = appliedList.findIndex(c => c.id === CANDIDATE_ID_TO_MOVE);

                if (candidateIndex > -1) {
                    const [movingCandidate] = appliedList.splice(candidateIndex, 1);
                    screeningList.unshift(movingCandidate);
                    return { ...prevBoard, applied: appliedList, screening: screeningList };
                }
                return prevBoard;
            });
        }, 2000);

        // Step 2: Move from Screening to Interview
        setTimeout(() => {
            setBoard(prevBoard => {
                const screeningList = [...prevBoard.screening];
                const interviewList = [...prevBoard.interview];
                const candidateIndex = screeningList.findIndex(c => c.id === CANDIDATE_ID_TO_MOVE);

                if (candidateIndex > -1) {
                    const [movingCandidate] = screeningList.splice(candidateIndex, 1);
                    interviewList.unshift(movingCandidate);
                    return { ...prevBoard, screening: screeningList, interview: interviewList };
                }
                return prevBoard;
            });
        }, 4000);

        // Step 3: Move from Interview to Hired
        setTimeout(() => {
            setBoard(prevBoard => {
                const interviewList = [...prevBoard.interview];
                const hiredList = [...prevBoard.hired];
                const candidateIndex = interviewList.findIndex(c => c.id === CANDIDATE_ID_TO_MOVE);

                if (candidateIndex > -1) {
                    const [movingCandidate] = interviewList.splice(candidateIndex, 1);
                    hiredList.unshift(movingCandidate);
                    return { ...prevBoard, interview: interviewList, hired: hiredList };
                }
                return prevBoard;
            });
        }, 6000);

        // Step 4: Reset the board to loop
        setTimeout(() => {
            setBoard(initialBoardState);
        }, 8500);
    };

    useEffect(() => {
        runAnimationSequence();
        animationIntervalRef.current = setInterval(runAnimationSequence, 9000);
        return () => {
            if (animationIntervalRef.current) {
                clearInterval(animationIntervalRef.current);
            }
        };
    }, []);

    return (
        <div className="w-full h-full bg-white rounded-md p-4 flex flex-col font-sans text-secondary border border-neutral-200">
            {/* Header */}
            <header className="flex justify-between items-center mb-4 flex-shrink-0">
                <h1 className="text-xl font-bold">Applicant Tracking</h1>
                <div className="flex items-center space-x-2">
                    <button className="hidden sm:flex items-center bg-white text-neutral-700 text-sm px-3 py-1.5 rounded-md hover:bg-neutral-100 border border-neutral-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Scheduled
                    </button>
                    <button className="flex items-center bg-primary text-white text-sm font-semibold px-3 py-1.5 rounded-md hover:bg-primary-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        Add Applicant
                    </button>
                    <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-neutral-200">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        <button className="text-neutral-600 text-sm">Log Out</button>
                    </div>
                </div>
            </header>

            {/* Kanban Board */}
            <main className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden flex-1">
                <AnimatePresence>
                    <KanbanColumn title="Applied" icon={columnIcons.applied} count={board.applied.length}>
                       {board.applied.map(c => <CandidateCard key={c.id} candidate={c} stage="applied" />)}
                    </KanbanColumn>
                    <KanbanColumn title="Screening" icon={columnIcons.screening} count={board.screening.length}>
                        {board.screening.map(c => <CandidateCard key={c.id} candidate={c} stage="screening" />)}
                    </KanbanColumn>
                    <KanbanColumn title="Interview" icon={columnIcons.interview} count={board.interview.length}>
                        {board.interview.map(c => <CandidateCard key={c.id} candidate={c} stage="interview" />)}
                    </KanbanColumn>
                    <KanbanColumn title="Hired" icon={columnIcons.hired} count={board.hired.length}>
                        {board.hired.map(c => <CandidateCard key={c.id} candidate={c} stage="hired" />)}
                    </KanbanColumn>
                </AnimatePresence>
            </main>
        </div>
    );
};

interface HeroProps {
    onStartTrialClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartTrialClick }) => {
  return (
    <section className="bg-white">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-24 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-extrabold text-secondary tracking-tighter leading-tight md:leading-tight mb-6"
        >
          Hire Smarter, <span className="text-primary">Faster.</span>
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-700 mb-8"
        >
          AI-powered resume parsing and applicant tracking to find the best candidates in record time.
        </motion.p>
        <motion.div 
          variants={itemVariants}
          className="flex justify-center"
        >
            <Button onClick={onStartTrialClick} className="px-8 py-3 text-base">Start Your 14-Day Free Trial</Button>
        </motion.div>
        <motion.div 
          variants={itemVariants}
          className="mt-16 max-w-7xl mx-auto"
        >
            <div className="aspect-video bg-neutral-100 rounded-lg shadow-2xl overflow-hidden">
                <FakeDashboardUI />
            </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;