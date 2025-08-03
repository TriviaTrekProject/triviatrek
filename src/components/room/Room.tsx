import React, { useCallback, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../spinner/spinner.tsx';
import useIsMobile from '../../hook/useIsMobile.ts';
import { useRoom } from '../../hook/useRoom.ts';
import MobileRoomView from './MobileRoomView.tsx';
import DesktopRoomView from './DesktopRoomView.tsx';
import { gameApi } from '../../api/gameApi.ts';
import { JokerType, PlayerJokerRequest } from "../../model/Request/PlayerJokerRequest.ts";

interface RoomProps {
    username: string;
}

// Constantes
const JOKER_SUCCESS_MESSAGE_DURATION = 3000; // 3 secondes pour le message de succès

const Room: React.FC<RoomProps> = ({ username }) => {
    // Hooks
    const { room, quizGame, users, isLoading, effetGlace, currentParticipantId } = useRoom(username);
    const isMobile = useIsMobile();
    
    // État local
    const [isChatOpen, setChatOpen] = useState(false);
    const [usedJokerGlace, setUsedJokerGlace] = useState(false);
    const [showJokerSuccessMessage, setShowJokerSuccessMessage] = useState(false);

    // Réinitialiser les jokers utilisés quand une nouvelle partie commence
    useEffect(() => {
        if (quizGame?.gameId) {
            // Si c'est une nouvelle partie (nouveau gameId), réinitialiser les jokers
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
        
        // Masquer le message de succès après 3 secondes
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

    const toggleChat = useCallback(() => {
        setChatOpen(prev => !prev);
    }, []);

    // Props communes pour les vues
    const commonViewProps = {
        roomId: room?.roomId,
        gameId: room?.gameId,
        quizGame,
        users,
        username,
        messages: room?.messages,
        currentParticipantId,
        handleSendJoker,
        usedJokerGlace,
        showJokerSuccessMessage, // Nouveau prop
        effetGlace,
        onStart: handleStartGame,
    };

    const chatProps = {
        isChatOpen,
        toggleChat,
    };

    // Render guards
    if (isLoading) {
        return <Spinner />;
    }

    if (!username) {
        return <Navigate to={`/guest/${room?.roomId}`} replace />;
    }

    // Render principal
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