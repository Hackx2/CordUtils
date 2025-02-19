import { useRouter, NextRouter } from 'next/router';
import { JSX, useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

import Link from 'next/link';
import navigation_data from '@/json/navigation_data.json';
import random_quote from '@/json/random_quotes.json';
import { randomObject } from '@/utils/Utility';

export default function Header(): JSX.Element {
  const router: NextRouter = useRouter();
  const [isMobileNavOpen, setIsOpen] = useState(false);
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    setQuote(randomObject(random_quote));
  }, []);

  const defaultBtnStyle = `text-md font-semibold px-4 py-2 rounded-lg transition duration-300`;

  return (
    <header className="py-5 fixed top-0 w-full z-50 mt-[40px] bg-black/30 md:bg-transparent border border-gray-700 md:border-transparent rounded-xl shadow-2xl md:shadow-none backdrop-blur-lg md:backdrop-blur-none">
      <div className="w-full px-5 flex justify-between items-center">
        <div className="text-xl font-bold text-white left-5 md:left-60 absolute top-1/2 transform -translate-y-1/2">
          ./cordutils
        </div>

        <div className="text-xl font-bold text-white right-5 md:right-60 absolute top-1/2 transform -translate-y-1/2 hidden md:block text-right">
          {quote}
        </div>

        <button
          className="md:hidden text-white absolute right-5 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out"
          onClick={() => setIsOpen(!isMobileNavOpen)}
        >
          <div className={`transition-all duration-300 ease-in-out ${isMobileNavOpen ? 'scale-90' : ''}`}>
            {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </button>
      </div>

      <nav
        className={`absolute inset-x-2.5 top-full bg-black/60 md:relative md:bg-transparent ${
          isMobileNavOpen ? 'block' : 'hidden'
        } md:block border-gray-700 md:border-transparent rounded-xl shadow-2xl md:shadow-none backdrop-blur-lg md:backdrop-blur-none mt-2.5`}
      >
        <ul className="flex flex-col md:flex-row md:justify-center md:items-center space-y-4 md:space-y-0 md:space-x-10 py-5 md:py-0">
          {navigation_data.map(({ path, name, className }) => (
            <li
              key={path}
              className={`relative transition duration-100 transform ${
                router.pathname === path ? `text-white ${className}` : 'text-gray-700'
              } md:hover:rotate-6 active:scale-95`}
            >
              {router.pathname === path ? (
                <span className={defaultBtnStyle}>{name}</span>
              ) : (
                <Link href={path} className={defaultBtnStyle}>
                  {name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
