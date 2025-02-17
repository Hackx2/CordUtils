import { useEffect } from "react";

/**
 * stops da event lol
 */
export function preventEvent(name: string) {
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
export function backgroundMovement() {
    const zoom:number = 110;
    const intensity:number = 20;
            
    useEffect(() => {
        const laMovement = (e: MouseEvent) => {
            const body = document.body;
            body.style.backgroundSize = `${zoom}%`;

            const x = ((e.clientX / window.innerWidth) - 0.5) * intensity;
            const y = ((e.clientY / window.innerHeight) - 0.5) * intensity;

            body.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
        };
        document.addEventListener("mousemove", laMovement);

        return () => document.removeEventListener("mousemove", laMovement);
    }, []);
}