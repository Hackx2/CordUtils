import { Github } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="text-white mt-0">
    <div className="container mx-auto text-center">
      <a href="https://github.com/hackx2/CordUtils-Website" className="mt-2 inline-block">
        <Github className="text-white hover:text-gray-400" size={24} />
      </a>
    </div>
  </footer>
);

export default Footer;
