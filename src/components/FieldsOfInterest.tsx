'use client'
import { motion } from 'framer-motion';

const FieldsOfInterest: React.FC = () => (
  <section className="py-12">
    <motion.h2
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
      className="text-2xl font-semibold text-center mb-6"
    >
      Fields of Interest
    </motion.h2>
    <div className="flex flex-wrap justify-center gap-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-80 p-6 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-100 hover:-translate-y-2 hover:rotate-1"
      >
        <h3 className="text-xl text-black font-semibold mb-2">Web/App Development</h3>
        <p className='text-black'>
          For web development, I use Next.js, and for app development, I utilize Flutter.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-80 p-6 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-100 hover:-translate-y-2 hover:rotate-1"
      >
        <h3 className="text-xl text-black font-semibold mb-2">DevOps</h3>
        <p className='text-black'>
          My journey in DevOps includes a strong focus on Linux.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-80 p-6 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-100 hover:-translate-y-2 hover:rotate-1"
      >
        <h3 className="text-xl text-black font-semibold mb-2">CEH</h3>
        <p className='text-black'>
          I follow Certified Ethical Hacking (CEH) when I get a chance and have time.
        </p>
      </motion.div>
    </div>
  </section>
);

export default FieldsOfInterest;
