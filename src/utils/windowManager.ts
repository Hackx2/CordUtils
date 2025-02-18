import { useEffect } from "react";
import { NextRouter, useRouter } from "next/router";

export function OpenWindowLink(link: string) {
  const router: NextRouter = useRouter();

  useEffect(() => {
    router.push(link); // homescreen wehn???
  }, [router]);
}

/**
 * stops da event lol
 */
export function PreventEvent(name: string) {
  useEffect(() => {
    const handler = (event: Event) => event.preventDefault();
    document.addEventListener(name, handler);

    return () => {
      document.removeEventListener(name, handler);
    };
  }, [name]);
}

/**
 * Background moves a lil (based on mouse's x & y axies).
 */
export function BackgroundMovement() {
  const zoom: number = 130;
  const intensity: number = 20;

  useEffect(() => {

    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;// no touch screen ppl :o

    const laMovement = (_ : MouseEvent) => {
      const body : HTMLElement = document.body;

      body.style.backgroundSize = `${zoom}%`;

      const x : number = (_.clientX / window.innerWidth - 0.5) * intensity;
      const y : number = (_.clientY / window.innerHeight - 0.5) * intensity;

      const calcPos:string = `calc(50% + ${x}px) calc(50% + ${y}px)`;
      body.style.backgroundPosition = calcPos;

      body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.9)),
      url('../../static/wallpaper.gif')`
    };
    document.addEventListener("mousemove", laMovement);

    return () => document.removeEventListener("mousemove", laMovement);
  }, []);
}
