'use client'
import Image from 'next/image';
import { motion } from 'framer-motion';

const Avatar: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
    className="flex justify-center mb-8"
  >
    <motion.div
      className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-gray-300 shadow-lg"
      whileHover={{ scale: 1.1, rotate: 10 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Image
        src="/me.png"  // Replace with your picture
        alt="Your Name"
        layout="fill"
        objectFit="cover"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-30"
      />
    </motion.div>
  </motion.div>
);

export default Avatar;
