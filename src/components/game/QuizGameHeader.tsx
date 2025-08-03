import React, { useState } from "react";
import { motion } from "motion/react";
import useIsMobile from "../../hook/useIsMobile.ts";
import JokerDrawer from "./JokerDrawer.tsx";
import JokerContainer from "./JokerContainer.tsx";
import IceIcon from "../common/Icons/IceIcon.tsx";
import JokerIcon from "../common/Icons/JokerIcon.tsx";
import {Difficulty, QuizGameHeaderProps} from "../../types/QuizGameInterfaces.ts";
import GameOver from "./GameOverComponent.tsx";
import SystemMessage from "./SystemMessageComponent.tsx";
import QuestionHeader from "./QuestionHeaderComponent.tsx";

const QuizGameHeader: React.FC<QuizGameHeaderProps> = ({
    idRoom,
    quizGame,
    messageSystem,
    handleSendJoker,
    usedJokerGlace,
    showJokerSuccessMessage
}) => {
    const isMobile = useIsMobile();
    const [isJokerDrawerOpen, setIsJokerDrawerOpen] = useState(false);

    // Calcul sécurisé de l'index de la question
    const currentQuestionIndex = (quizGame?.questions?.findIndex(
        question => question.id === quizGame?.currentQuestion?.id
    ) ?? -1) + 1;

    // Fonction helper pour valider et typer la difficulté
    const getDifficultyValue = (difficulty: string | undefined): Difficulty | undefined => {
        if (difficulty === "easy" || difficulty === "medium" || difficulty === "hard") {
            return difficulty;
        }
        return undefined;
    };

    // Si pas de room ou pas de jeu
    if (!idRoom || !quizGame) return null;

    // Si partie terminée
    if (quizGame.finished) {
        return <GameOver scores={quizGame.scores} />;
    }

    const difficultyValue = getDifficultyValue(quizGame.currentQuestion?.difficulty);

    // Version mobile
    if (isMobile) {
        return (
            <>
                {/* Bouton pour ouvrir le drawer des jokers */}
                <motion.button
                    type="button"
                    className={`fixed top-4 left-4 z-35 p-2 backdrop-blur-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all duration-300 ${
                        usedJokerGlace 
                            ? 'bg-stone-500/40 opacity-50' 
                            : 'bg-white/20 hover:bg-white/30'
                    }`}
                    onClick={() => setIsJokerDrawerOpen(true)}
                    whileHover={usedJokerGlace ? {} : { scale: 1.1 }}
                    whileTap={usedJokerGlace ? {} : { scale: 0.9 }}
                    aria-label="Ouvrir le menu des jokers"
                >
                    <JokerIcon className={`w-8 h-8 fill-secondary-darker transition-all duration-300 ${
                        usedJokerGlace ? 'opacity-60 grayscale' : ''
                    }`} />
                </motion.button>

                {/* Drawer des jokers */}
                <JokerDrawer
                    isOpen={isJokerDrawerOpen}
                    onOpenChange={setIsJokerDrawerOpen}
                    handleSendJoker={handleSendJoker}
                    usedJokerGlace={usedJokerGlace}
                />

                <QuestionHeader
                    question={quizGame.currentQuestion?.question || ""}
                    questionIndex={currentQuestionIndex}
                    categoryId={quizGame.currentQuestion?.categoryId}
                    difficulty={difficultyValue}
                    waitingForNext={quizGame.waitingForNext}
                    isMobile={true}
                />

                {messageSystem && (
                    <SystemMessage 
                        message={messageSystem} 
                        type="info" 
                        isMobile={true} 
                    />
                )}

                {showJokerSuccessMessage && (
                    <SystemMessage 
                        message="Vous avez gelé vos adversaires !" 
                        type="success" 
                        isMobile={true} 
                    />
                )}
            </>
        );
    }

    // Version desktop
    return (
        <>
            <div className="flex flex-auto flex-row flex-wrap gap-2">
                <JokerContainer 
                    label="Bloc de glace" 
                    handleSendJoker={handleSendJoker}
                    isDisabled={usedJokerGlace}
                >
                    <IceIcon />
                </JokerContainer>
            </div>

            <QuestionHeader
                question={quizGame.currentQuestion?.question || ""}
                questionIndex={currentQuestionIndex}
                category={quizGame.currentQuestion?.category}
                difficulty={difficultyValue}
                isMobile={false}
            />

            {messageSystem && (
                <SystemMessage 
                    message={messageSystem} 
                    type="info" 
                    isMobile={false} 
                />
            )}

            {showJokerSuccessMessage && (
                <SystemMessage 
                    message="Vous avez gelé vos adversaires !" 
                    type="success" 
                    isMobile={false} 
                />
            )}
        </>
    );
};

export default QuizGameHeader;