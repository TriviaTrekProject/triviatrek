import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks/typedReduxHooks';
import { setJokerUsed, setJokerMessage } from '../slices/GameSlice';
import { gameApi } from '../api/gameApi';
import { JokerType, PlayerJokerRequest } from "../model/Request/PlayerJokerRequest.ts";
import {selectCurrentParticipantId, selectRoom} from "../store/selectors/roomSelectors.ts";
import {selectQuizGame} from "../store/selectors/gameSelectors.ts";
import {selectUsedJokers} from "../store/selectors/jokerSelectors.ts";

const JOKER_SUCCESS_MESSAGE_DURATION = 3000;
const JOKER_GLACE_TYPE = JokerType.PRIORITE_REPONSE.toString();

export const useGameActions = (username: string) => {
  const dispatch = useAppDispatch();
  
  // Sélecteurs Redux
  const currentParticipantId = useAppSelector(selectCurrentParticipantId);
  const room = useAppSelector(selectRoom);
  const quizGame = useAppSelector(selectQuizGame);
  const usedJokers = useAppSelector(selectUsedJokers);
  const usedJokerGlace = usedJokers[JOKER_GLACE_TYPE] || false;

  // Handler pour envoyer un joker
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

    // Mettre à jour Redux immédiatement
    dispatch(setJokerUsed({ jokerType: JOKER_GLACE_TYPE, used: true }));
    dispatch(setJokerMessage({ jokerType: JOKER_GLACE_TYPE, show: true }));

    // Envoyer au serveur
    gameApi.submitJoker(gameId, request);
    
    // Masquer le message après délai
    setTimeout(() => {
      dispatch(setJokerMessage({ jokerType: JOKER_GLACE_TYPE, show: false }));
    }, JOKER_SUCCESS_MESSAGE_DURATION);
    
  }, [quizGame?.gameId, currentParticipantId, username, usedJokerGlace, dispatch]);

  // Handler pour démarrer une partie
  const handleStartGame = useCallback(() => {
    if (!room?.roomId || !room.gameId || !currentParticipantId) {
      console.warn('Cannot start game: missing required data');
      return;
    }
    
    gameApi.startQuizGame(room.gameId, room.roomId, currentParticipantId);
  }, [room?.roomId, room?.gameId, currentParticipantId]);

  return {
    handleSendJoker,
    handleStartGame,
  };
};
