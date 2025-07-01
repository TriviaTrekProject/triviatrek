import {QuestionDTO} from "../../model/QuizGameDTO.ts";
import FlatButton from "../button/FlatButton.tsx";
import { gameApi } from "../../api/gameApi.ts";
import useIsMobile from "../../hook/useIsMobile.ts";
import { useEffect, useState } from "react";
import {
    DELAY_TIME_BY_OPTION,
    DELAY_TIME_BY_QUESTION,
    DELAY_TIME_DISABLED,
} from "../../hook/useRoom.ts";

interface QuizGameComponentProps {
    idRoom: string | undefined;
    currentQuestion: QuestionDTO;
    username: string;
    gameId: string;
    isRevealed: boolean;
}




interface DelayedButtonProps {
    onClick: (() => Promise<void>);
    label: string;
    isCorrect: boolean;
    isRevealed: boolean;
    time: number;
}

const DelayedButton = ({ onClick, label, isCorrect, isRevealed, time }: DelayedButtonProps) => {
    const [hidden, setHidden] = useState(true);
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setHidden(false), time);
        const timerDisable = setTimeout(() => setDisabled(false), DELAY_TIME_DISABLED);
        return () => {clearTimeout(timer); clearTimeout(timerDisable)};
    }, [label, time]);

    const buttonClass = !isRevealed
        ? "bg-primary-dark"
        : isCorrect
            ? "bg-green-400 pointer-events-none"
            : "bg-red-400 pointer-events-none";

    return (
        <FlatButton
            className={`${hidden ? 'invisible' : ''} ${buttonClass}`}
            text={label}
            onClick={onClick}
            disabled={disabled}
        />
    );
};

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
                    <div key={index} className={optionClass}>
                        <DelayedButton
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
