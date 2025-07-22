import { motion } from "motion/react";

interface ProgressPieProps {
    /** Taille du SVG en pixels */
    size?: number;
    /** Épaisseur du trait */
    strokeWidth?: number;
    /** Durée de l’animation en millisecondes */
    duration: number;
    /** Couleur du fond (piste) */trackColor?: string;
    /** Couleur de la partie « remplie » */
    progressColor?: string;
    /** Callback appelé à la fin de l’animation */
    onComplete?: () => void;
}

const ProgressPie = ({
                                                     size = 50,
                                                     strokeWidth = 4,
                                                     duration,
                                                     trackColor = "#e5e7eb",
                                                     progressColor = "#3b82f6",
                                                     onComplete,
                                                 }: ProgressPieProps) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="transform -rotate-90"
        >
            {/* Cercle de fond */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={trackColor}
                strokeWidth={strokeWidth}
                fill="transparent"
            />
            {/* Cercle animé */}
            <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={progressColor}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={0}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: circumference }}
                transition={{ duration: duration / 1000, ease: "linear" }}
                onAnimationComplete={onComplete}
            />
        </svg>
    );
};

export default ProgressPie;
