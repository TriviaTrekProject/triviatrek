import {useRoom} from "./useRoom.ts";
import {useGameState} from "./useGameState.ts";

/**
 * Hook composite qui combine Room et Game Redux
 * Simplifie l'utilisation dans les composants
 */
export const useRoomAndGame = (username: string) => {
  // Données room
  const roomData = useRoom(username);
  
  // Données game (dépendent des données room)
  const gameData = useGameState(
    roomData.room?.roomId,
    roomData.room?.gameId,
    roomData.currentParticipantId,
    username,
    roomData.room?.activeGame || false
  );

  return {
    // Room data
    room: roomData.room,
    users: roomData.users,
    currentParticipantId: roomData.currentParticipantId,
    isLoading: roomData.isLoading,
    error: roomData.error,
    hasJoined: roomData.hasJoined,
    
    // Game data
    quizGame: gameData.quizGame,
    effetGlace: gameData.effetGlace,
    gameError: gameData.error,
    gameLoading: gameData.isLoading,
  };
};
