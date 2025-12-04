import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks/typedReduxHooks';
import { 
  updateQuizGame, 
  handleJokerEffect, 
  clearEffetGlace, 
  setGameSubscriptionStatus,
  setJokerSubscriptionStatus,
  joinGame,
  clearGame 
} from '../slices/GameSlice';
import { socketService } from '../ws/socketService';
import { QuizGameDTO } from '../model/QuizGameDTO';
import {JokerDTO} from "../model/JokerDTO.ts";

export const useGameState = (
  roomId: string | undefined,
  gameId: string | undefined, 
  currentParticipantId: string | null,
  username: string,
  activeGame: boolean
) => {
  const dispatch = useAppDispatch();
  const { 
    quizGame, 
    effetGlace, 
    hasSubscribedToGameUpdates,
    hasSubscribedToJokerUpdates,
    isLoading, 
    error 
  } = useAppSelector((state) => state.game);

  // Souscription aux mises à jour du jeu
  useEffect(() => {
    if (!roomId || !gameId || hasSubscribedToGameUpdates) return;

    console.log('Subscribing to game updates:', gameId);
    
    socketService.subscribe(`/game/${gameId}`, (game: QuizGameDTO) => {
      console.log('Received game update:', game.gameId);
      dispatch(updateQuizGame(game));
    });

    dispatch(setGameSubscriptionStatus(true));

  }, [roomId, gameId, hasSubscribedToGameUpdates, dispatch]);

  // Souscription aux mises à jour des jokers
  useEffect(() => {
    if (!roomId || !gameId || hasSubscribedToJokerUpdates) return;

    console.log('Subscribing to joker updates:', gameId);

    socketService.subscribe(`/game/joker/${gameId}`, (joker: JokerDTO) => {
      console.log('Received joker update:', joker);
      dispatch(handleJokerEffect({ joker, currentUsername: username }));
    });

    dispatch(setJokerSubscriptionStatus(true));

  }, [roomId, gameId, hasSubscribedToJokerUpdates, username, dispatch]);

  // Gérer l'effet glace avec timeout
  useEffect(() => {
    if (effetGlace) {
      console.log('Ice effect activated for 8 seconds');
      const timer = setTimeout(() => {
        dispatch(clearEffetGlace());
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [effetGlace, dispatch]);

  // Rejoindre automatiquement une partie active
  useEffect(() => {
    if (roomId && gameId && activeGame && !quizGame && currentParticipantId) {
      console.log('Auto-joining active game:', gameId);
      dispatch(joinGame({ gameId, participantId: currentParticipantId }));
    }
  }, [roomId, activeGame, gameId, quizGame, currentParticipantId, dispatch]);

  // Réinitialiser les abonnements quand le gameId change
  useEffect(() => {
    if (gameId) {
      dispatch(setGameSubscriptionStatus(false));
      dispatch(setJokerSubscriptionStatus(false));
    }
  }, [gameId, dispatch]);

  // Nettoyer à la destruction
  useEffect(() => {
    return () => {
      dispatch(clearGame());
    };
  }, [dispatch]);

  return {
    quizGame,
    effetGlace,
    isLoading,
    error,
  };
};
