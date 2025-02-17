import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <header className="py-5 fixed top-0 w-full z-50 overflow-hidden bg-black">
      <nav className="flex justify-center items-center">
        <ul className="flex space-x-10">
          <li
            className={`relative transition duration-100 transform ${
              router.pathname === '/'
                ? 'text-white'
                : 'text-gray-500'
            } hover:scale-110 hover:rotate-6 active:scale-95`}
          >
            <Link href="/" className="text-md font-semibold px-4 py-2 rounded-lg transition duration-300">
              del
            </Link>
          </li>
          <li
            className={`relative transition duration-100 transform ${
              router.pathname === '/spam'
                ? 'text-white'
                : 'text-gray-700'
            } hover:scale-110 hover:rotate-6 active:scale-95`}
          >
            <Link href="/spam" className="text-md font-semibold px-4 py-2 rounded-lg transition duration-300">
              nuker
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
