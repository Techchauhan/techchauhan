'use client'

import Avatar from './Avatar';
import { motion } from 'framer-motion';
import HyperText from './magicui/hyper-text';
import SparklesText from './magicui/sparkles-text';

const Introduction: React.FC = () => (
  <section className="relative text-center py-12 bg-gradient-to-r  overflow-hidden">
    {/* Background Animation */}
    <motion.div
      className="absolute inset-0 -z-10 opacity-30"
      animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
      transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
    />
    
    <Avatar />

    <motion.h1
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      className="text-3xl font-bold mb-4 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500"
    >
      Hi, I'm {" "}
      <HyperText
        className="text-4xl font-bold text-white dark:text-white cursor-pointer"
        text=" Rishab Chauhan"
      />
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-lg mb-6 text-gray-700"
    >
      <SparklesText text="I'm a passionate developer with experience in building modern web applications. Welcome to my portfolio!" />
    </motion.p>

    <motion.div
      className="flex justify-center space-x-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <a
        href="https://linkedin.com/in/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 hover:underline transition-transform transform hover:scale-105"
      >
        LinkedIn
      </a>
      <a
        href="https://twitter.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-600 hover:underline transition-transform transform hover:scale-105"
      >
        Twitter
      </a>
      <a
        href="https://reddit.com/user/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-600 hover:text-orange-800 hover:underline transition-transform transform hover:scale-105"
      >
        Reddit
      </a>
      <a
        href="https://github.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className= "text-white hover:text-gray-700 hover:underline transition-transform transform hover:scale-105"
      >
        GitHub
      </a>
    </motion.div>
  </section>
);

export default Introduction;
