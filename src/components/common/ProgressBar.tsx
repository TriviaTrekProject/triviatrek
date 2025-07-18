import { motion } from "motion/react";

interface ProgressBarProps {
    /** Durée totale du timer (en millisecondes) */
    duration: number;
    /** Clé à changer pour redémarrer la barre (ex. id de question) */
    restartKey?: string | number;
    /** Callback exécuté quand le timer arrive à zéro */
    onFinish?: () => void;
    /** Classe Tailwind pour l’épaisseur (hauteur en horizontal, largeur en vertical) */
    heightClass?: string;    // ex. "h-2"
    /** Classes Tailwind/CSS pour personnaliser l’aspect du track */
    trackClassName?: string; // ex. "bg-gray-300"
    /** Classes Tailwind/CSS pour personnaliser l’aspect de la barre */
    barClassName?: string;   // ex. "bg-primary"
    /** Si true, la barre devient verticale */
    vertical?: boolean;
}

/**
 * ProgressBar – composant générique affichant une barre qui passe de 100 % à 0 %
 * en `duration` millisecondes, animé par Motion.
 */
const ProgressBar = ({
                         duration,
                         restartKey,
                         onFinish,
                         heightClass = "h-3",
                         trackClassName = "bg-secondary",
                         barClassName   = "bg-secondary-dark",
                         vertical = false
                     }: ProgressBarProps) => {
    // Pour l’orientation verticale, on échange hauteur <-> largeur
    const containerClasses = vertical
        ? `h-full ${heightClass.replace(/^h-/, "w-")} ${trackClassName} rounded overflow-hidden my-2`
        : `w-full ${heightClass} ${trackClassName} rounded overflow-hidden mx-2`;

    const barInitial = vertical
        ? { height: "100%" }
        : { width: "100%" };

    const barAnimate = vertical
        ? { height: "0%" }
        : { width: "0%" };

    const barClasses = vertical
        ? `w-full ${barClassName}`
        : `h-full ${barClassName}`;

    return (
        <div className={containerClasses}>
            <motion.div
                key={restartKey ?? "static"}
                className={barClasses}
                initial={barInitial}
                animate={barAnimate}
                transition={{ duration: duration / 1000, ease: "linear" }}
                onAnimationComplete={() => onFinish?.()}
            />
        </div>
    );
};

export default ProgressBar;
