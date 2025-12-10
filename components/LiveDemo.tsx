import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Type } from '@google/genai';

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = (reader.result as string).split(',')[1];
      resolve(result);
    };
    reader.onerror = (error) => reject(error);
  });
};

interface ParsedResume {
    candidateName: string;
    contact: { email: string; phone: string };
    keySkills: string[];
    workExperience: { 
        role: string; 
        company: string; 
        duration: string;
        responsibilities: string[];
    }[];
    education: {
        degree: string;
        institution: string;
        graduationYear: string;
    };
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

const summaryBoxVariants = {
  initial: {
    borderColor: '#dfe1e6', // neutral-200
    boxShadow: '0 0 0px rgba(0, 82, 204, 0)' 
  },
  glow: {
    borderColor: '#0052cc', // primary
    boxShadow: '0 0 15px rgba(0, 82, 204, 0.3)',
    transition: { 
      duration: 0.5, 
      ease: 'easeInOut',
      repeat: 3,
      repeatType: 'reverse'
    }
  }
};


const AnimatedArrow = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
    >
        <motion.svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary opacity-70"
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
            <path
                d="M4 12h16m-7-7l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </motion.svg>
    </motion.div>
);


const LiveDemo: React.FC = () => {
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processResume = async (uploadedFile: File) => {
    setIsLoading(true);
    setError(null);
    setParsedResume(null);
    setFile(uploadedFile);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API key is not configured.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const base64Data = await fileToBase64(uploadedFile);

      const filePart = {
        inlineData: {
          mimeType: uploadedFile.type,
          data: base64Data,
        },
      };

      const prompt = `Analyze the provided resume. Extract the candidate's name, contact information (email and phone), a list of their top 5-7 key skills/technologies, their complete work experience (including role, company, duration, and a list of key responsibilities or achievements for each position), and their highest level of education (degree, institution, and graduation year). Focus on factual information from their work history and skills.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [filePart, { text: prompt }] },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
                candidateName: { type: Type.STRING },
                contact: {
                    type: Type.OBJECT,
                    properties: {
                        email: { type: Type.STRING },
                        phone: { type: Type.STRING }
                    },
                    required: ['email']
                },
                keySkills: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "A list of the candidate's most relevant technical and soft skills."
                },
                workExperience: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            role: { type: Type.STRING },
                            company: { type: Type.STRING },
                            duration: { type: Type.STRING, description: "e.g., 'Jan 2020 - Present'" },
                            responsibilities: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            }
                        },
                        required: ['role', 'company', 'duration', 'responsibilities']
                    },
                    description: "A detailed list of the candidate's previous jobs."
                },
                education: {
                    type: Type.OBJECT,
                    properties: {
                        degree: { type: Type.STRING },
                        institution: { type: Type.STRING },
                        graduationYear: { type: Type.STRING }
                    },
                    required: ['degree', 'institution']
                }
            },
            required: ['candidateName', 'contact', 'keySkills', 'workExperience', 'education']
          }
        }
      });
      
      const jsonText = response.text.trim();
      const jsonResponse = JSON.parse(jsonText);
      setParsedResume(jsonResponse);

    } catch (e: any) {
      console.error(e);
      setError('Oops! We couldn\'t analyze that resume. This sometimes happens with password-protected files, complex layouts, or unsupported formats. Please try again with a different resume file (PDF, DOC, DOCX).');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        processResume(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragActive(false);
      if (event.dataTransfer.files && event.dataTransfer.files[0]) {
          processResume(event.dataTransfer.files[0]);
      }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragActive(true); };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragActive(false); };

  return (
    <section id="demo" className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">See it in Action</h2>
          <p className="mt-4 text-lg text-neutral-700 max-w-2xl mx-auto">
            Upload a resume to see our AI extract key information instantly.
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-2 gap-8 items-start">
           <AnimatePresence>
            {!isLoading && !parsedResume && !error && (
               <AnimatedArrow />
            )}
          </AnimatePresence>
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <div
              onClick={handleButtonClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-300 h-full flex flex-col justify-center items-center ${
                isDragActive ? 'border-primary bg-primary-light' : 'border-neutral-300 hover:border-primary'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {isDragActive ? (
                <p className="mt-4 text-primary font-semibold">Drop the resume here...</p>
              ) : (
                <p className="mt-4 text-neutral-600">
                  Drag & drop a resume file here, or click to select a file.
                  <span className="block text-sm text-neutral-500 mt-1">(PDF, DOC, DOCX)</span>
                </p>
              )}
            </div>
          </motion.div>

          <motion.div 
            variants={summaryBoxVariants}
            animate={parsedResume ? 'glow' : 'initial'}
            className="bg-white p-6 rounded-lg min-h-[400px] border-2"
          >
            <h3 className="text-lg font-semibold text-secondary mb-4">AI-Generated Summary</h3>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center h-full pt-16">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-neutral-600">Analyzing resume...</p>
                </motion.div>
              ) : error ? (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-600 text-center pt-16">
                  <p>{error}</p>
                </motion.div>
              ) : parsedResume ? (
                 <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-left space-y-4 text-sm max-h-[350px] overflow-y-auto pr-2">
                    <div>
                        <h4 className="font-bold text-secondary">{parsedResume.candidateName}</h4>
                        <p className="text-neutral-600">{parsedResume.contact?.email}{parsedResume.contact?.phone && ` | ${parsedResume.contact.phone}`}</p>
                    </div>
                    
                    <div>
                        <h5 className="font-semibold text-secondary mb-2">Key Skills</h5>
                        <div className="flex flex-wrap gap-2">
                            {parsedResume.keySkills.map((skill, index) => (
                                <span key={index} className="bg-primary-light text-primary text-xs font-medium px-2.5 py-0.5 rounded-full">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h5 className="font-semibold text-secondary mb-2">Work Experience</h5>
                        <div className="space-y-3">
                            {parsedResume.workExperience.map((job, index) => (
                                <div key={index} className="pb-2 border-b border-neutral-200 last:border-b-0">
                                    <p className="font-semibold text-neutral-800">{job.role} at {job.company}</p>
                                    <p className="text-xs text-neutral-500 mb-1">{job.duration}</p>
                                    <ul className="list-disc list-inside text-neutral-700 space-y-1 pl-1">
                                        {job.responsibilities.map((resp, i) => <li key={i} className="text-xs">{resp}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h5 className="font-semibold text-secondary mb-1">Education</h5>
                        <p className="text-neutral-700">{parsedResume.education.degree}, {parsedResume.education.institution} {parsedResume.education.graduationYear && `(${parsedResume.education.graduationYear})`}</p>
                    </div>
                 </motion.div>
              ) : (
                <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-neutral-500 text-center pt-24">
                    <p>Upload a resume to see the magic happen!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;