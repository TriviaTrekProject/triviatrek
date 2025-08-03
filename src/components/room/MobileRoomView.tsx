import React, { useEffect, useRef, useState } from "react";
import RoomUsers from './RoomUsers';
import QuizGameHeader from '../game/QuizGameHeader';
import QuizGameAnswersComponent from '../game/QuizGameAnswersComponent';
import StartGameButton from '../game/StartGameButton';
import { MessageDTO } from "../../model/MessageDTO.ts";
import ParallaxBackgroundIce from "../../layout/ParallaxBackgroundIce.tsx";
import {RoomViewProps} from "../../types/roomTypes/RoomViewPropsInterface.ts";

const MobileRoomView: React.FC<RoomViewProps> = ({
    roomId,
    gameId,
    quizGame,
    users,
    username,
    onStart,
    messages,
    effetGlace,
    currentParticipantId,
    handleSendJoker,
    usedJokerGlace,
    showJokerSuccessMessage
}) => {
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
    const messageSystem = messages?.find(
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

            <div className="flex flex-col items-center h-full w-full flex-start justify-center gap-8 pt-14">
                <div className="w-full h-dvh absolute -z-1 bg-black opacity-40 pointer-events-none top-0" />
                
                {effetGlace && <ParallaxBackgroundIce />}

                <div className="flex flex-col items-center justify-center gap-8 w-full">
                    <QuizGameHeader 
                        handleSendJoker={handleSendJoker} 
                        usedJokerGlace={usedJokerGlace}
                        showJokerSuccessMessage={showJokerSuccessMessage} // Nouveau prop transmis
                        currentParticipantId={currentParticipantId} 
                        username={username} 
                        idRoom={roomId} 
                        quizGame={quizGame} 
                        messageSystem={messageSystem}
                    />
                </div>

                <div className="rounded-2xl w-full flex flex-col px-2 gap-6 bg-transparent justify-center items-center">
                    {quizGame?.currentQuestion ? (
                        <QuizGameAnswersComponent
                            idRoom={roomId!}
                            gameId={gameId!}
                            currentQuestion={quizGame.currentQuestion}
                            currentParticipantId={currentParticipantId}
                        />
                    ) : (
                        <StartGameButton onClick={onStart} />
                    )}
                </div>
            </div>
        </>
    );
};

export default MobileRoomView;