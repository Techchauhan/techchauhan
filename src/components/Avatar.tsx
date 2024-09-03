'use client'
import Image from 'next/image';
import { motion } from 'framer-motion';

const Avatar: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    className="flex justify-center mb-8"
  >
    <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
      <Image
        src="/your-picture.jpg"  // Replace with your picture
        alt="Your Name"
        layout="fill"
        objectFit="cover"
      />
    </div>
  </motion.div>
);

export default Avatar;
