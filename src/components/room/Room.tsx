import React, { useCallback, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../spinner/spinner.tsx';
import useIsMobile from '../../hook/useIsMobile.ts';
import { useRoomAndGame } from '../../hook/useRoomAndGame.ts';
import MobileRoomView from './MobileRoomView.tsx';
import DesktopRoomView from './DesktopRoomView.tsx';
import { gameApi } from '../../api/gameApi.ts';
import { JokerType, PlayerJokerRequest } from "../../model/Request/PlayerJokerRequest.ts";
import {useUxInteraction} from "../../hook/useUxInteraction.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks/typedReduxHooks.ts";
import {JOKER_GLACE_TYPE} from "../../types/consts.ts";
import {resetJokersForNewGame, setJokerMessage, setJokerUsed} from "../../slices/GameSlice.ts";

interface RoomProps {
    username: string;
}

const JOKER_SUCCESS_MESSAGE_DURATION = 3000;

const Room: React.FC<RoomProps> = ({ username }) => {
    const isMobile = useIsMobile();
    const { isChatOpen, toggleChat } = useUxInteraction();
    const dispatch = useAppDispatch();


    const {
        room,
        users,
        currentParticipantId,
        isLoading,
        quizGame,
        effetGlace,
    } = useRoomAndGame(username);

    const { usedJokers, jokerMessages } = useAppSelector((state) => state.game);
    const usedJokerGlace = usedJokers[JOKER_GLACE_TYPE] || false;
    const showJokerSuccessMessage = jokerMessages[JOKER_GLACE_TYPE] || false;

    // Réinitialiser les jokers utilisés quand une nouvelle partie commence
    useEffect(() => {
        if (quizGame?.gameId) {
            dispatch(resetJokersForNewGame());
        }
    }, [quizGame?.gameId, dispatch]);

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
        // Mettre à jour l'état Redux immédiatement
        dispatch(setJokerUsed({ jokerType: JOKER_GLACE_TYPE, used: true }));
        dispatch(setJokerMessage({ jokerType: JOKER_GLACE_TYPE, show: true }));

        // Envoyer la requête au serveur
        gameApi.submitJoker(gameId, request);

        // Masquer le message de succès après le délai
        setTimeout(() => {
            dispatch(setJokerMessage({ jokerType: JOKER_GLACE_TYPE, show: false }));
        }, JOKER_SUCCESS_MESSAGE_DURATION);

    }, [quizGame?.gameId, currentParticipantId, username, usedJokerGlace, dispatch]);


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
        quizGame,
        users,
        username,
        messages: room?.messages,
        currentParticipantId,
        handleSendJoker,
        usedJokerGlace,
        showJokerSuccessMessage,
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