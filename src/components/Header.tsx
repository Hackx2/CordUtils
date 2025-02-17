import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <header className="py-5 fixed top-0 w-full z-50 mt-[40px] overflow-hidden">
      <nav className="flex justify-center items-center">
        <ul className="flex space-x-10">
          <li
            className={` relative transition duration-100 transform ${
              router.pathname === '/webhook-delete'
                ? 'text-white goldTextEffect'
                : 'text-gray-700'
            } hover:rotate-6 active:scale-95`}
          >
            <Link href="/" className="text-md font-semibold px-4 py-2 rounded-lg transition duration-300">
              ./del
            </Link>
          </li>
          <li
            className={` relative transition duration-100 transform  ${
              router.pathname === '/webhook-spammer'
                ? 'text-white redTextEffect'
                : 'text-gray-700'
            } active:scale-95 hover:rotate-6`}
          >
            <Link href="/webhook-spammer" className="text-md font-semibold px-4 py-2 rounded-lg transition duration-300">
              ./spam
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
