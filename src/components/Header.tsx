import { useRouter, NextRouter } from 'next/router';
import { JSX, useState } from 'react';
import { Menu, X } from 'lucide-react';

import Link from 'next/link';

export default function Header(): JSX.Element {//mobile support
  const router: NextRouter = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="py-5 fixed top-0 w-full z-50 mt-[40px] bg-black/30 md:bg-transparent border border-gray-700 md:border-transparent rounded-xl  shadow-2xl md:shadow-none backdrop-blur-lg md:backdrop-blur-none  ">
      <div className=" w-full px-5 flex justify-between items-center">
        <div className="text-xl font-bold text-white left-5 md:left-60 absolute top-1/2 transform -translate-y-1/2">
          ./cordutils
        </div>
        <div className="text-xl font-bold text-white right-5 md:right-60 absolute top-1/2 transform -translate-y-1/2 hidden md:block">
          {router.pathname.replace('/webhook/', './')}
        </div>
        <button
          className="md:hidden text-white absolute right-5 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'scale-90' : ''}`}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </button>
      </div>

      <nav
  className={`absolute inset-x-2.5 top-full bg-black/60 md:relative md:bg-transparent ${isOpen ? 'block' : 'hidden'} md:block border-gray-700 md:border-transparent rounded-xl shadow-2xl md:shadow-none backdrop-blur-lg md:backdrop-blur-none mt-2.5`}
>
  
        <ul className="flex flex-col md:flex-row md:justify-center md:items-center space-y-4 md:space-y-0 md:space-x-10 py-5 md:py-0">
          <div>
            <li className={`relative transition duration-100 transform ${router.pathname === '/webhook/delete' ? 'text-white goldTextEffect' : 'text-gray-700'}  md:hover:rotate-6 active:scale-95`}>
              <Link href="/webhook/delete" className="text-md font-semibold px-4 py-2 rounded-lg transition duration-300">./del</Link>
            </li>
          </div>
          <div>
            <li className={`relative transition duration-100 transform ${router.pathname === '/webhook/spammer' ? 'text-white redTextEffect' : 'text-gray-700'} active:scale-95  md:hover:rotate-6`}>
              <Link href="/webhook/spammer" className="text-md font-semibold px-4 py-2 rounded-lg transition duration-300">./spammer</Link>
            </li>
          </div>
          <div>
            <li className={`relative transition duration-100 transform ${router.pathname === '/webhook/lookup' ? 'text-white purpleTextEffect' : 'text-gray-700'} active:scale-95  md:hover:rotate-6`}>
              <Link href="/webhook/lookup" className="text-md font-semibold px-4 py-2 rounded-lg transition duration-300">./lookup</Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
