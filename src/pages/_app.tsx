// css stuff
import "@/styles/globals.css";
// import "@/styles/effects.css"

import { PreventEvent, BackgroundMovement } from "@/utils/WindowManager";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  BackgroundMovement();
  PreventEvent('contextmenu');

  return (<><Component {...pageProps} /></>);
}
