import "@/styles/globals.css";
import Header from "@/components/Header";
import type { AppProps } from "next/app";
import { PreventEvent, BackgroundMovement } from "@/utils/windowManager";

export default function App({ Component, pageProps }: AppProps) {
  BackgroundMovement();
  PreventEvent('contextmenu');

  return (<><Header /><Component {...pageProps} /></>);
}
