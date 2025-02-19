import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="text-white mt-0">
    <motion.div
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0}}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className="container mx-auto text-center"
    >
      <a href="https://github.com/hackx2/CordUtils" className="mt-6 inline-block">
        <Github className="text-white hover:text-gray-400 transition-transform duration-200 hover:-translate-y-1" size={24} />
      </a>
    </motion.div>
  </footer>
);

export default Footer;
