import React from "react";
import {GameOverProps} from "../../types/QuizGameInterfaces.ts";

const GameOver: React.FC<GameOverProps> = ({ scores }) => {
    const getWinner = () => {
        if (scores.length === 0) return "Personne";
        return scores.reduce((best, current) => 
            current.score > best.score ? current : best
        ).player;
    };

    return (
        <div className="text-center" role="region" aria-label="Résultats de la partie">
            <h1 className="font-bold text-[64px] text-shadow-black text-shadow-2xl text-white font-[Nova_Square]">
                Partie terminée !
            </h1>
            <div className="font-bold text-3xl text-shadow-black text-shadow-2xl text-white">
                {getWinner()} a gagné !
            </div>
        </div>
    );
};

export default GameOver;
