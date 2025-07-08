import {QuestionDTO} from "../../model/QuizGameDTO.ts";
import { gameApi } from "../../api/gameApi.ts";
import useIsMobile from "../../hook/useIsMobile.ts";
import { motion } from "motion/react"

import {
    DELAY_TIME_BY_OPTION,
    DELAY_TIME_BY_QUESTION,
} from "../../hook/useRoom.ts";
import DelayedButton from "../button/DelayedButton.tsx";

interface QuizGameComponentProps {
    idRoom: string | undefined;
    currentQuestion: QuestionDTO;
    username: string;
    gameId: string;
    isRevealed: boolean;
}

const MotionDelayedButton = motion.create(DelayedButton)


const QuizGameAnswersComponent = ({
                                      idRoom,
                                      currentQuestion,
                                      gameId,
                                      username,
                                      isRevealed
                                  }: QuizGameComponentProps) => {
    const isMobile = useIsMobile();

    const onAnswer = async (answer: string) => {
        if (!gameId) return;
        await gameApi.submitAnswer(gameId, { player: username, answer });
    };

    // Helper function to render options
    const renderOptions = (layout: "mobile" | "desktop") => {
        const wrapperClass =
            layout === "mobile"
                ? "flex h-auto w-full justify-center items-center gap-4 flex-auto flex-column flex-wrap"
                : "flex h-auto justify-center items-center gap-8 flex-auto flex-row flex-wrap w-full";

        const optionClass =
            layout === "mobile" ? "flex basis-full" : "flex basis-[calc(50%-1.5rem)]";

        return (
            <div className={wrapperClass}>
                {currentQuestion?.options.map((option, index) => (
                    <div key={index} className={optionClass}
                    >
                        <MotionDelayedButton
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                // DELAY en millisecondes => delay en secondes
                                delay: (DELAY_TIME_BY_QUESTION + index * DELAY_TIME_BY_OPTION) / 1000,
                                // vous pouvez aussi ajuster la durée globale
                                duration: 0.3
                            }}
                            key={option}
                            onClick={async () => onAnswer(option)}
                            label={option}
                            isCorrect={option === currentQuestion?.correctAnswer}
                            isRevealed={isRevealed}
                            time={(DELAY_TIME_BY_QUESTION + index * DELAY_TIME_BY_OPTION)}
                        />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="flex grow-1 flex-col gap-6 items-center justify-center w-full">
            {(!gameId || !idRoom) && <div className="text-primary">En attente de la partie...</div>}

            {idRoom && currentQuestion && (
                <div className="flex grow-1 items-center w-full">
                    {isMobile ? renderOptions("mobile") : renderOptions("desktop")}
                </div>
            )}
        </div>
    );
};

export default QuizGameAnswersComponent;
