'use client'
import { motion } from 'framer-motion';

const Projects: React.FC = () => (
  <section className="py-12">
    <motion.h2
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="text-2xl font-semibold text-center mb-6"
    >
      Projects Completed
    </motion.h2>
    <div className="flex flex-wrap justify-center gap-8">
      <div className="w-80 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Project 1</h3>
        <p>A description of the first project.</p>
      </div>
      <div className="w-80 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Project 2</h3>
        <p>A description of the second project.</p>
      </div>
      <div className="w-80 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Project 3</h3>
        <p>A description of the third project.</p>
      </div>
    </div>
  </section>
);

export default Projects;
