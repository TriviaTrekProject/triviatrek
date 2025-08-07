import { useState, useEffect } from "react";

export default function useIsMobile(breakpoint = 1024): boolean {
    const [isMobile, setIsMobile] = useState(() => {
        // Détection initiale basée sur la largeur ET l'orientation
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isPortrait = height > width;
        
        // Considérer comme mobile si :
        // - Largeur < 1024px OU
        // - Tablette en portrait (largeur < 1200px ET portrait)
        return width < breakpoint || (width < 1200 && isPortrait);
    });

    useEffect(() => {
        const onResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isPortrait = height > width;
            
            // Même logique que l'initialisation
            setIsMobile(width < breakpoint || (width < 1200 && isPortrait));
        };
        
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [breakpoint]);

    return isMobile;
}