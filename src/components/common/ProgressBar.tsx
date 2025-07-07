import { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
    /** Durée totale du timer (en millisecondes) */
    duration: number;
    /** Clé à changer pour redémarrer la barre (ex. id de question) */
    restartKey?: any;
    /** Callback exécuté quand le timer arrive à zéro */
    onFinish?: () => void;
    /** Classes Tailwind/CSS pour personnaliser l’aspect */
    heightClass?: string;        // ex. "h-2"
    trackClassName?: string;     // ex. "bg-gray-300"
    barClassName?: string;       // ex. "bg-primary"
}

/**
 * ProgressBar – composant générique affichant une barre qui passe de 100 % à 0 %
 * en `duration` millisecondes.
 */
const ProgressBar = ({
                         duration,
                         restartKey,
                         onFinish,
                         heightClass = "h-3",
                         trackClassName = "bg-secondary",
                         barClassName   = "bg-secondary-dark",
                     }: ProgressBarProps) => {
    const [percent, setPercent] = useState(100);
    const animFrameRef = useRef<number | null>(null);

    useEffect(() => {
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const newPercent = Math.max(0, 100 - (elapsed / duration) * 100);
            setPercent(newPercent);

            if (elapsed < duration) {
                animFrameRef.current = requestAnimationFrame(tick);
            } else {
                onFinish?.();
            }
        };

        animFrameRef.current = requestAnimationFrame(tick);

        return () => {
            if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
        };
    }, [duration, restartKey, onFinish]);

    return (
        <div className={`w-full ${heightClass} ${trackClassName} rounded overflow-hidden mx-2`}>
            <div
                className={`${barClassName} h-full transition-[width] duration-50 animate-pulse
                    
`}
                style={{ width: `${percent}%` }}
            />
        </div>
    );
};

export default ProgressBar;
