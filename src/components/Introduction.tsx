'use client'
import Avatar from './Avatar';
import { motion } from 'framer-motion';

const Introduction: React.FC = () => (
  <section className="text-center py-12">
    <Avatar />
    <motion.h1
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-3xl font-bold mb-4"
    >
      Hi, I'm Rishab Chauhan
    </motion.h1>
    <p className="text-lg mb-6">
      I'm a passionate developer with experience in building modern web applications. Welcome to my portfolio!
    </p>
    <div className="flex justify-center space-x-4">
      <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
      <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Twitter</a>
      <a href="https://reddit.com/user/yourprofile" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Reddit</a>
      <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:underline">GitHub</a>
    </div>
  </section>
);

export default Introduction;
