import React, {useCallback, useState} from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../spinner/spinner.tsx';
import useIsMobile from '../../hook/useIsMobile.ts';
import { useRoom } from '../../hook/useRoom.ts';
import MobileRoomView from './MobileRoomView.tsx';
import DesktopRoomView from './DesktopRoomView.tsx';
import { gameApi } from '../../api/gameApi.ts';
import {JokerType, PlayerJokerRequest} from "../../model/Request/PlayerJokerRequest.ts";

interface RoomProps {
    username: string;
}

const Room: React.FC<RoomProps> = ({ username }) => {
    const { room, quizGame, users, isLoading, effetGlace, currentParticipantId } = useRoom(username);
    const isMobile = useIsMobile();
    const [isChatOpen, setChatOpen] = useState(false);
    const [usedJokerGlace, setUsedJokerGlace] = useState(false);

    const handleSendJoker = useCallback((gameId:string, participantId:string|null, username: string) => {
        if(!gameId || !participantId) return;
        const request: PlayerJokerRequest = {
            username: username,
            jokerType: JokerType.PRIORITE_REPONSE,
            participantId: participantId
        }
        gameApi.submitJoker(gameId, request);
        setUsedJokerGlace(true);
        setTimeout(()=> {
            setUsedJokerGlace(false);
        }, 8000)
    },[]);

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
                        username={username}
                        onStart={handleStart}
                        messages={room?.messages}
                        currentParticipantId={currentParticipantId}
                        isChatOpen={isChatOpen}
                        toggleChat={() => setChatOpen(open => !open)}
                        handleSendJoker={() => handleSendJoker(quizGame?.gameId ?? '', currentParticipantId, username)}
                        usedJokerGlace={usedJokerGlace}
                        effetGlace={effetGlace}
                    />
                )
                : (
                    <DesktopRoomView
                        roomId={room?.roomId}
                        gameId={room?.gameId}
                        quizGame={quizGame}
                        users={users}
                        username={username}
                        isChatOpen={isChatOpen}
                        toggleChat={() => setChatOpen(open => !open)}
                        onStart={handleStart}
                        messages={room?.messages}
                        effetGlace={effetGlace}
                        currentParticipantId={currentParticipantId}
                        handleSendJoker={() => handleSendJoker(quizGame?.gameId ?? '', currentParticipantId, username)}
                        usedJokerGlace={usedJokerGlace}

                    />
                )
            }
        </>
    );
};

export default Room;