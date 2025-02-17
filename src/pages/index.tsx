import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";

export default function Redir_Index() {// owo
  const router : NextRouter = useRouter();

  useEffect(() => {
    router.push('/webhook-delete');
  }, [router]);

  return null;
}