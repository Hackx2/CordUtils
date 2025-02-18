// css stuff
import "@/styles/globals.css";
import "@/styles/effects.css";

import type { AppProps } from "next/app";
import { PreventEvent, BackgroundMovement } from "@/utils/windowManager";

export default function App({ Component, pageProps }: AppProps) {
  BackgroundMovement();
  PreventEvent('contextmenu');

  return (<><Component {...pageProps} /></>);
}
