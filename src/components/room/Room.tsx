import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../spinner/spinner.tsx';
import useIsMobile from '../../hook/useIsMobile.ts';
import { useRoom } from '../../hook/useRoom.ts';
import MobileRoomView from './MobileRoomView.tsx';
import DesktopRoomView from './DesktopRoomView.tsx';
import { gameApi } from '../../api/gameApi.ts';

interface RoomProps {
    username: string;
}

const Room: React.FC<RoomProps> = ({ username }) => {
    const { room, quizGame, users, revealAnswer, isLoading, effetGlace, currentParticipantId } = useRoom(username);
    const isMobile = useIsMobile();
    const [isChatOpen, setChatOpen] = useState(false);

    const handleStart = () => {
        if (room?.roomId && room.gameId && currentParticipantId) {
            gameApi.startQuizGame(room.gameId, room.roomId, currentParticipantId);
        }
    };

    if (isLoading) return <Spinner />;
    if (!username) return <Navigate to={`/guest/${room?.roomId}`} replace />;

    return (
        <>
            {isMobile
                ? (
                    <MobileRoomView
                        roomId={room?.roomId}
                        gameId={room?.gameId}
                        quizGame={quizGame}
                        users={users}
                        revealAnswer={revealAnswer}
                        username={username}
                        onStart={handleStart}
                        messages={room?.messages}
                        currentParticipantId={currentParticipantId}
                    />
                )
                : (
                    <DesktopRoomView
                        roomId={room?.roomId}
                        gameId={room?.gameId}
                        quizGame={quizGame}
                        users={users}
                        revealAnswer={revealAnswer}
                        username={username}
                        isChatOpen={isChatOpen}
                        toggleChat={() => setChatOpen(open => !open)}
                        onStart={handleStart}
                        messages={room?.messages}
                        effetGlace={effetGlace}
                        currentParticipantId={currentParticipantId}
                    />
                )
            }
        </>
    );
};

export default Room;