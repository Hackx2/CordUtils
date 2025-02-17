// css???
import "@/styles/globals.css";

// Types
import type { AppProps } from "next/app";

// Components
import Header from "@/components/Header";

// la sexy window manager
import { preventEvent, backgroundMovement } from "@/utils/windowManager";

export default function App({ Component, pageProps }: AppProps) {
  backgroundMovement();
  preventEvent('contextmenu');

  return (<><Header/><Component {...pageProps} /></>);
}
