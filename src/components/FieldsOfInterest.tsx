'use client'
import { motion } from 'framer-motion';

const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.05, boxShadow: '0 8px 16px rgba(0,0,0,0.3)', backgroundColor: '#f7fafc', y: -8, rotate: 1 }
};

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
    <div className="flex flex-wrap justify-center gap-8 ">
      {/* First */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="w-80 p-6 cursor-pointer bg-white rounded-lg shadow-lg transform transition-transform duration-300"
      >
        <h3 className="text-xl text-black font-semibold mb-2">Web/App Development</h3>
        <p className='text-black'>
          For web development, I use Next.js, and for app development, I utilize Flutter.
        </p>
      </motion.div>

      {/* Second */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="w-80 p-6 bg-white cursor-pointer rounded-lg shadow-lg transform transition-transform duration-300"
      >
        <h3 className="text-xl text-black font-semibold mb-2">DevOps</h3>
        <p className='text-black'>
          My journey in DevOps includes a strong focus on Linux.
        </p>
      </motion.div>

      {/* Third */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="w-80 p-6 bg-white  cursor-pointer rounded-lg shadow-lg transform transition-transform duration-300"
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
