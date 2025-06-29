import { QuizGameDTO } from "../../model/QuizGameDTO.ts";
import FlatButton from "../button/FlatButton.tsx";
import { gameApi } from "../../api/gameApi.ts";
import useIsMobile from "../../hook/useIsMobile.ts";
import { useEffect, useState } from "react";

interface QuizGameComponentProps {
    idRoom: string | undefined;
    quizGame: QuizGameDTO | null;
    username: string;
    gameId: string;
    isRevealed: boolean;
}

const onClick = (
    roomId: string | undefined,
    gameId: string,
    username: string
) => {
    if (!gameId || !roomId) return;
    return () => gameApi.startQuizGame(gameId, roomId, username);
};

const StartGameButton = ({ onClick }: { onClick: (() => Promise<void>) | undefined }) => (
    <div>
        <button
            className="bg-tertiary font-bold hover:bg-secondary"
            type="button"
            onClick={onClick}
        >
            Lancer quiz
        </button>
    </div>
);

interface DelayedButtonProps {
    onClick: (() => Promise<void>);
    label: string;
    isCorrect: boolean;
    isRevealed: boolean;
}

const DelayedButton = ({ onClick, label, isCorrect, isRevealed }: DelayedButtonProps) => {
    const [isDisabled, setDisabled] = useState(true);

    useEffect(() => {
        setDisabled(true);
        const timer = setTimeout(() => setDisabled(false), 1500);
        return () => clearTimeout(timer);
    }, [label]);

    const buttonClass = !isRevealed
        ? "bg-tertiary"
        : isCorrect
            ? "bg-green-400 pointer-events-none"
            : "bg-red-400 pointer-events-none";

    return (
        <FlatButton
            className={buttonClass}
            disabled={isDisabled}
            text={label}
            onClick={onClick}
        />
    );
};

const QuizGameAnswersComponent = ({
                                      idRoom,
                                      quizGame,
                                      gameId,
                                      username,
                                      isRevealed,
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
                {quizGame?.currentQuestion?.options.map((option, index) => (
                    <div key={index} className={optionClass}>
                        <DelayedButton
                            onClick={async () => onAnswer(option)}
                            label={option}
                            isCorrect={option === quizGame?.currentQuestion?.correctAnswer}
                            isRevealed={isRevealed}
                        />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="flex grow-1 flex-col gap-6 items-center justify-center w-full">
            {(!gameId || !idRoom) && <div className="text-primary">En attente de la partie...</div>}

            {idRoom && gameId && quizGame === null && (
                <StartGameButton onClick={onClick(idRoom, gameId, username)} />
            )}

            {idRoom && quizGame && (
                <div className="flex grow-1 items-center w-full">
                    {isMobile ? renderOptions("mobile") : renderOptions("desktop")}
                </div>
            )}
        </div>
    );
};

export default QuizGameAnswersComponent;
