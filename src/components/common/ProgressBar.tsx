import { motion } from "motion/react";

interface ProgressBarProps {
    /** Durée totale du timer (en millisecondes) */
    duration: number;
    /** Clé à changer pour redémarrer la barre (ex. id de question) */
    restartKey?: string | number;
    /** Callback exécuté quand le timer arrive à zéro */
    onFinish?: () => void;
    /** Classes Tailwind/CSS pour personnaliser l’aspect */
    heightClass?: string;        // ex. "h-2"
    trackClassName?: string;     // ex. "bg-gray-300"
    barClassName?: string;       // ex. "bg-primary"
}

/**
 * ProgressBar – composant générique affichant une barre qui passe de 100 % à 0 %
 * en `duration` millisecondes, animé par Framer Motion.
 */
const ProgressBar = ({
                         duration,
                         restartKey,
                         onFinish,
                         heightClass = "h-3",
                         trackClassName = "bg-secondary",
                         barClassName   = "bg-secondary-dark"
                     }: ProgressBarProps) => {
    return (
        <div className={`w-full ${heightClass} ${trackClassName} rounded overflow-hidden mx-2`}>
            <motion.div
                // Le key force le remontage du composant à chaque changement de restartKey
                key={restartKey ?? "static"}
                className={`${barClassName} h-full`}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
                onAnimationComplete={() => onFinish?.()}
            />
        </div>
    );
};

export default ProgressBar;
