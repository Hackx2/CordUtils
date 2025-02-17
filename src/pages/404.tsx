import { useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';

export default function Redir_404() {// gwa, lol
  const router : NextRouter = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return null;
}
