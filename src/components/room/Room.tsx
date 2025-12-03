import React, { useCallback, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../spinner/spinner.tsx';
import useIsMobile from '../../hook/useIsMobile.ts';
import { useRoom } from '../../hook/useRoom.ts';
import { useGameState } from '../../hook/useGameState.ts';
import { useUxInteraction } from '../../hook/useUxInteraction.ts';
import MobileRoomView from './MobileRoomView.tsx';
import DesktopRoomView from './DesktopRoomView.tsx';
import { gameApi } from '../../api/gameApi.ts';
import { JokerType, PlayerJokerRequest } from "../../model/Request/PlayerJokerRequest.ts";

interface RoomProps {
    username: string;
}

const JOKER_SUCCESS_MESSAGE_DURATION = 3000;

const Room: React.FC<RoomProps> = ({ username }) => {
    const isMobile = useIsMobile();
    const { isChatOpen, toggleChat } = useUxInteraction();
    
    const { room, users, currentParticipantId, isLoading: roomLoading } = useRoom(username);
    
    const { quizGame, effetGlace } = useGameState(
        room?.roomId,
        room?.gameId,
        currentParticipantId,
        username,
        room?.activeGame || false
    );

    // État local (peut-être migré plus tard)
    const [usedJokerGlace, setUsedJokerGlace] = useState(false);
    const [showJokerSuccessMessage, setShowJokerSuccessMessage] = useState(false);


    // Réinitialiser les jokers utilisés quand une nouvelle partie commence
    useEffect(() => {
        if (quizGame?.gameId) {
            setUsedJokerGlace(false);
            setShowJokerSuccessMessage(false);
        }
    }, [quizGame?.gameId]);

    // Handlers
    const handleSendJoker = useCallback(() => {
        const gameId = quizGame?.gameId;
        
        if (!gameId || !currentParticipantId || !username || usedJokerGlace) {
            console.warn('Cannot send joker: missing required data or joker already used');
            return;
        }

        const request: PlayerJokerRequest = {
            username,
            jokerType: JokerType.PRIORITE_REPONSE,
            participantId: currentParticipantId
        };

        gameApi.submitJoker(gameId, request);
        setUsedJokerGlace(true);
        setShowJokerSuccessMessage(true);
        
        setTimeout(() => {
            setShowJokerSuccessMessage(false);
        }, JOKER_SUCCESS_MESSAGE_DURATION);
        
    }, [quizGame?.gameId, currentParticipantId, username, usedJokerGlace]);

    const handleStartGame = useCallback(() => {
        if (!room?.roomId || !room.gameId || !currentParticipantId) {
            console.warn('Cannot start game: missing required data');
            return;
        }
        
        gameApi.startQuizGame(room.gameId, room.roomId, currentParticipantId);
    }, [room?.roomId, room?.gameId, currentParticipantId]);

    // Props communes pour les vues
    const commonViewProps = {
        roomId: room?.roomId,
        gameId: room?.gameId,
        quizGame, // ✅ Maintenant depuis Redux !
        users,
        username,
        messages: room?.messages,
        currentParticipantId,
        handleSendJoker,
        usedJokerGlace,
        showJokerSuccessMessage,
        effetGlace, // ✅ Maintenant depuis Redux !
        onStart: handleStartGame,
    };

    const chatProps = {
        isChatOpen,
        toggleChat,
    };

    // Render guards
    if (roomLoading) {
        return <Spinner />;
    }

    if (!username) {
        return <Navigate to={`/guest/${room?.roomId}`} replace />;
    }

    return (
        <>
            {isMobile ? (
                <MobileRoomView
                    {...commonViewProps}
                    {...chatProps}
                />
            ) : (
                <DesktopRoomView
                    {...commonViewProps}
                    {...chatProps}
                />
            )}
        </>
    );
};

export default Room;