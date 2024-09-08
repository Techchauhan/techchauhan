'use client'
import { motion } from 'framer-motion';
import { FaMobileAlt, FaLaptopCode, FaGraduationCap, FaBook } from 'react-icons/fa'; // Importing icons from react-icons

const Projects: React.FC = () => (
  <section className="py-12 bg-gradient-to-r from-indigo-500 to-purple-600">
    <motion.h2
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl text-white font-bold text-center mb-12"
    >
      Projects Completed
    </motion.h2>
    <div className="flex flex-wrap justify-center gap-8">
      {/* Project 1 */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-80 p-6 bg-white rounded-lg shadow-lg transition-all duration-300"
      >
        <div className="flex items-center justify-center mb-4 text-indigo-500">
          <FaMobileAlt size={40} />
        </div>
        <h3 className="text-xl font-semibold mb-2">Ecommerce Android Application</h3>
        <p className="text-gray-600">Framework – Flutter (Dart), PHP (for API) & MyPhpAdmin (Server) - 2021</p>
      </motion.div>

      {/* Project 2 */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-80 p-6 bg-white rounded-lg shadow-lg transition-all duration-300"
      >
        <div className="flex items-center justify-center mb-4 text-purple-500">
          <FaGraduationCap size={40} />
        </div>
        <h3 className="text-xl font-semibold mb-2">Academy Android Application</h3>
        <p className="text-gray-600">Framework – Flutter & Firebase - 2021</p>
      </motion.div>

      {/* Project 3 */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-80 p-6 bg-white rounded-lg shadow-lg transition-all duration-300"
      >
        <div className="flex items-center justify-center mb-4 text-green-500">
          <FaLaptopCode size={40} />
        </div>
        <h3 className="text-xl font-semibold mb-2">College Android Application & Website</h3>
        <p className="text-gray-600">Framework – Flutter (Android), HTML, CSS & PHP (Web), phpMyAdmin (Server) - 2022</p>
      </motion.div>

      {/* Project 4 */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-80 p-6 bg-white rounded-lg shadow-lg transition-all duration-300"
      >
        <div className="flex items-center justify-center mb-4 text-red-500">
          <FaBook size={40} />
        </div>
        <h3 className="text-xl font-semibold mb-2">E-Learning Website</h3>
        <p className="text-gray-600">Framework – Next.js & Firebase - 2024</p>
      </motion.div>
    </div>
  </section>
);

export default Projects;
