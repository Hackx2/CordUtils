import "@/styles/globals.css";
import { useEffect } from 'react'
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const hcontext = (UEAH: { preventDefault: () => void }) => {
    UEAH.preventDefault()
  }

  useEffect(() => {
    document.addEventListener('contextmenu', hcontext)
    return function cleanme() {
      document.removeEventListener('contextmenu', hcontext)
    }
  })

  return (<><Component {...pageProps} /></>);
}
