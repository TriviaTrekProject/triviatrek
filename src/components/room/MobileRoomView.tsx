import { useEffect, useRef, useState } from "react";
import RoomUsers from './RoomUsers';
import QuizGameHeader from '../game/QuizGameHeader';
import QuizGameAnswersComponent from '../game/QuizGameAnswersComponent';
import StartGameButton from '../game/StartGameButton';
import { MessageDTO } from "../../model/MessageDTO.ts";
import ParallaxBackgroundIce from "../../layout/ParallaxBackgroundIce.tsx";
import {useAppSelector} from "../../store/hooks/typedReduxHooks.ts";
import {selectCurrentParticipantId, selectRoom, selectUsers} from "../../store/selectors/roomSelectors.ts";
import {selectEffetGlace, selectQuizGame} from "../../store/selectors/gameSelectors.ts";
import {useGameActions} from "../../hook/useGameActions.ts";
import {selectJokerSuccessMessage, selectUsedJokers} from "../../store/selectors/jokerSelectors.ts";
import {JOKER_GLACE_TYPE} from "../../types/consts.ts";

interface MobileRoomViewProps {
    username: string;
}

const MobileRoomView = ({
username}: MobileRoomViewProps) => {

    const room = useAppSelector(selectRoom);
    const users = useAppSelector(selectUsers);
    const quizGame = useAppSelector(selectQuizGame);
    const effetGlace = useAppSelector(selectEffetGlace);
    const currentParticipantId = useAppSelector(selectCurrentParticipantId);

    // Actions et UI state
    const { handleSendJoker, handleStartGame } = useGameActions(username);
    const usedJokerGlace  = useAppSelector(selectUsedJokers);
    const jokerSuccessMessage = useAppSelector(selectJokerSuccessMessage)


    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Effet pour fermer le drawer au clic extérieur
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                drawerOpen &&
                drawerRef.current &&
                !drawerRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target)
            ) {
                setDrawerOpen(false);
            }
        };

        if (drawerOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [drawerOpen]);

    // Calcul du message système
    const messageSystem = room?.messages?.find(
        (message: MessageDTO) => message.sender === `GAME_SYSTEM_${quizGame?.currentQuestionIndex}`
    )?.content;

    return (
        <>
            <div className="absolute top-6 right-4 flex self-end items-center">
                <RoomUsers 
                    currentParticipantId={currentParticipantId} 
                    username={username} 
                    users={users} 
                    scores={quizGame?.scores ?? []} 
                />
            </div>

            <div className="flex flex-col items-center h-dvh w-full flex-start justify-center gap-8 pt-14">
                <div className="w-full h-dvh absolute -z-1 bg-black opacity-40 pointer-events-none top-0" />
                
                {effetGlace && <ParallaxBackgroundIce />}

                <div className="flex flex-col items-center justify-center gap-8 w-full">
                    <QuizGameHeader 
                        handleSendJoker={handleSendJoker}
                        usedJokerGlace={usedJokerGlace[JOKER_GLACE_TYPE]}
                        showJokerSuccessMessage={jokerSuccessMessage[JOKER_GLACE_TYPE]} // Nouveau prop transmis
                        currentParticipantId={currentParticipantId} 
                        username={username} 
                        idRoom={room?.roomId}
                        quizGame={quizGame} 
                        messageSystem={messageSystem}
                    />
                </div>

                <div className="rounded-2xl w-full flex flex-col px-2 gap-6 bg-transparent justify-center items-center">
                    {quizGame?.currentQuestion ? (
                        <QuizGameAnswersComponent
                            idRoom={room?.roomId}
                            gameId={quizGame.gameId}
                            currentQuestion={quizGame.currentQuestion}
                            currentParticipantId={currentParticipantId}
                        />
                    ) : (
                        <StartGameButton onClick={handleStartGame} />
                    )}
                </div>
            </div>
        </>
    );
};

export default MobileRoomView;