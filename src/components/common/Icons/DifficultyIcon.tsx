import React from "react";
import EasyIcon from "./EasyIcon.tsx";
import MediumIcon from "./MediumIcon.tsx";
import {Difficulty, DifficultyIconProps} from "../../../types/QuizGameInterfaces.ts";
import HardIcon from "./HardIcon.tsx";

const DifficultyIcon: React.FC<DifficultyIconProps> = ({ 
    difficulty, 
    className = "w-12 h-auto", 
    withLabel = true 
}) => {
    const getDifficultyLabel = (difficulty: Difficulty) => {
        switch (difficulty) {
            case "easy": return "Facile";
            case "medium": return "Moyen";
            case "hard": return "Difficile";
        }
    };

    const IconComponent = () => {
        switch (difficulty) {
            case "easy": return <EasyIcon className={`${className} flex justify-center items-center`} />;
            case "medium": return <MediumIcon className={`${className} flex justify-center items-center`} />;
            case "hard": return <HardIcon className={`${className} flex justify-center items-center`} />;
        }
    };

    return (
        <div aria-label={withLabel ? `Difficulté: ${getDifficultyLabel(difficulty)}` : undefined}>
            <IconComponent />
        </div>
    );
};

export default DifficultyIcon;