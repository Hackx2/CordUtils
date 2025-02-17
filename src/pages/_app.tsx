import "@/styles/globals.css";
import { useEffect } from 'react'
import type { AppProps } from "next/app";
import Header from "@/components/Header";

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

  return (<><Header/><Component {...pageProps} /></>);
}
