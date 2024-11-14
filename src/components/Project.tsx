'use client';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import React from 'react';
import IconCloud from '@/components/ui/icon-cloud';
import GradualSpacing from './ui/gradual-spacing';

const Projects: React.FC = () => {
  // Define the list of icon slugs for IconCloud
  const iconSlugs = [
    'react',        // React logo
    'javascript',   // JavaScript logo
    'typescript',   // TypeScript logo
    'node-dot-js',  // Node.js logo
    'html5',        // HTML5 logo
    'css3',         // CSS3 logo
    'flutter',      // Flutter logo
    'firebase',     // Firebase logo
    'next-dot-js',  // Next.js logo
    'github',       // GitHub logo
    'jenkins',      // Jenkins logo
    'kubernetes',   // Kubernetes logo
    'jira',         // Jira logo
    'aws',          // AWS logo
    'postgresql',   // PostgreSQL logo
    'bigquery',     // BigQuery logo
    'googlecloud',  // Google Cloud logo
    'java',         // Java logo
    'python',       // Python logo
    'docker',       // Docker logo
    'androidstudio',// Android Studio logo
    'android',      // Android logo
    'dart',         // Dart logo
  ];

  return (
    <section className="relative py-12 overflow-hidden bg-gradient-to-br from-black via-indigo-900 to-purple-900">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(100)].map((_, index) => (
          <div
            key={index}
            className="absolute w-1 h-1 bg-white rounded-full opacity-80"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 2 + 2}s ease-in-out infinite, drift ${Math.random() * 15 + 10}s ease-in-out infinite`,
              opacity: `${Math.random() * 0.5 + 0.5}`,
            }}
          />
        ))}
      </div>
 
      <GradualSpacing 
      text='Project Completed'
      duration={0.7} // Adjust the duration of each letter's animation
      delayMultiple={0.05} // Adjust the delay between each character
      className="text-purple-500 text-2xl font-bold " //
      />

      {/* Flexbox Layout: Left Column for Projects, Right Column for IconCloud */}
      <div className="relative z-10 max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-12">
        {/* Left Side: Project List */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ul className="space-y-6">
              {/* Project Items */}
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between pb-4 border-b"
              >
                <div>
                  <h3 className="text-lg font-semibold">Ecommerce Android Application</h3>
                  <p className="text-gray-600">Framework – Flutter (Dart), PHP (API), MyPhpAdmin (Server) - 2021</p>
                </div>
                <a href="https://github.com/your-username/ecommerce-android-app" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={28} className="text-gray-700 transition-colors duration-200 hover:text-indigo-500" />
                </a>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h3 className="text-lg font-semibold">Academy Android Application</h3>
                  <p className="text-gray-600">Framework – Flutter & Firebase - 2021</p>
                </div>
                <a href="https://github.com/your-username/academy-android-app" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={28} className="text-gray-700 hover:text-purple-500 transition-colors duration-200" />
                </a>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h3 className="text-lg font-semibold">College Android Application & Website</h3>
                  <p className="text-gray-600">Framework – Flutter (Android), HTML, CSS, PHP (Web), phpMyAdmin (Server) - 2022</p>
                </div>
                <a href="https://github.com/your-username/college-app-and-website" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={28} className="text-gray-700 hover:text-green-500 transition-colors duration-200" />
                </a>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">E-Learning Website</h3>
                  <p className="text-gray-600">Framework – Next.js & Firebase - 2024</p>
                </div>
                <a href="https://github.com/your-username/e-learning-website" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={28} className="text-gray-700 hover:text-red-500 transition-colors duration-200" />
                </a>
              </motion.li>
            </ul>
          </div>
        </div>

        {/* Right Side: IconCloud Component */}
        <div className="w-full md:w-1/3">
          <IconCloud iconSlugs={iconSlugs} />
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes drift {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-5px, 5px); }
          50% { transform: translate(5px, -5px); }
          75% { transform: translate(-5px, -5px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </section>
  );
};

export default Projects;
