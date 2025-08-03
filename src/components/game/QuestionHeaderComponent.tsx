import React from "react";
import QuizIcon from "../common/Icons/QuizIcon.tsx";
import ProgressPie from "../common/ProgressPie.tsx";
import DifficultyIcon from "../common/Icons/DifficultyIcon.tsx";
import {getCategoryIcon} from "../../utils/CategoryIconSelector.tsx";
import {QuestionHeaderProps} from "../../types/QuizGameInterfaces.ts";

const QuestionHeader: React.FC<QuestionHeaderProps> = ({
    question,
    questionIndex,
    category,
    categoryId,
    difficulty,
    waitingForNext,
    isMobile
}) => {
    return (
        <>
            {isMobile ? (
                // Version mobile
                <div className="flex flex-row justify-between items-center w-full gap-2 bg-primary/50 backdrop-blur-sm border border-white/20 rounded-2xl px-3 py-2">
                    {categoryId && (
                        <div className="font-bold text-sm text-white italic text-shadow-lg" aria-label={`Catégorie: ${categoryId}`}>
                            {getCategoryIcon(categoryId)}
                        </div>
                    )}
                    
                    <div className="flex flex-row justify-center items-center gap-2 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-tight font-[Nova_Square]">
                        <div className="px-4 bg-clip-text text-white text-shadow-lg text-xl flex flex-row justify-center items-center gap-3">
                            {waitingForNext ? (
                                <ProgressPie 
                                    size={24} 
                                    strokeWidth={4} 
                                    duration={10000} 
                                    trackColor="rgba(255,255,255,0.3)" 
                                    progressColor="var(--color-green-400)"
                                    aria-label="Temps restant pour la prochaine question"
                                />
                            ) : (
                                <div className="h-full mx-1 w-4" />
                            )}
                            <span>Question {questionIndex}</span>
                        </div>
                    </div>
                    
                    <DifficultyIcon difficulty={difficulty!} className="w-12 h-auto" />
                </div>
            ) : (
                // Version desktop
                <>
                    <div className="flex flex-row justify-center items-center gap-4 bg-primary/50 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                        <div className="font-bold text-xl text-white italic text-shadow-lg" aria-label={`Catégorie: ${category}`}>
                            {category}
                        </div>
                        <DifficultyIcon difficulty={difficulty!} className="w-16 h-auto" />
                    </div>

                    <div className="flex flex-row justify-center items-center gap-2 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-tight font-[Nova_Square]">
                        <QuizIcon className="w-[60px] h-[60px]" />
                        <span className="px-4 bg-clip-text text-white text-shadow-lg text-5xl">
                            Question {questionIndex}
                        </span>
                    </div>
                </>
            )}

            <h1 className={`font-bold ${isMobile ? "text-xl" : "text-3xl"} text-white font-[Nova_Square] text-shadow-lg text-center`}>
                {question}
            </h1>
        </>
    );
};

export default QuestionHeader;
