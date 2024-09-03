'use client'
import { motion } from 'framer-motion';

const RecentPosts: React.FC = () => (
  <section className="py-12 bg-gray-100">
    <motion.h2
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="text-2xl font-semibold text-center mb-6"
    >
      Recent Posts
    </motion.h2>
    <div className="flex flex-wrap justify-center gap-8">
      <div className="w-80 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Post 1</h3>
        <p>A brief summary of the first post.</p>
      </div>
      <div className="w-80 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Post 2</h3>
        <p>A brief summary of the second post.</p>
      </div>
      <div className="w-80 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Post 3</h3>
        <p>A brief summary of the third post.</p>
      </div>
    </div>
  </section>
);

export default RecentPosts;
