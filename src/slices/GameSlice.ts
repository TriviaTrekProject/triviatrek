import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { QuizGameDTO } from '../model/QuizGameDTO';
import { gameApi } from '../api/gameApi';
import {JokerDTO} from "../model/JokerDTO.ts";
import {JokerType} from "../model/Request/PlayerJokerRequest.ts";

interface GameState {
  quizGame: QuizGameDTO | null;
  effetGlace: boolean;
  hasSubscribedToGameUpdates: boolean;
  hasSubscribedToJokerUpdates: boolean;
  isLoading: boolean;
  error: string | null;
  usedJokers: {
    [jokerType: string]: boolean;
  };
  jokerMessages: {
    [jokerType: string]: boolean;
  };
}

const initialState: GameState = {
  quizGame: null,
  effetGlace: false,
  hasSubscribedToGameUpdates: false,
  hasSubscribedToJokerUpdates: false,
  isLoading: false,
  error: null,
  usedJokers: {},
  jokerMessages: {},
};

// Async thunks pour les appels API
export const joinGame = createAsyncThunk(
  'game/joinGame',
  async ({ gameId, participantId }: { gameId: string; participantId: string }) => {
    await gameApi.joinGame(gameId, participantId);
    return { gameId, participantId };
  }
);

export const startGame = createAsyncThunk(
  'game/startGame',
  async ({ gameId, roomId, participantId }: { gameId: string; roomId: string; participantId: string }) => {
    await gameApi.startQuizGame(gameId, roomId, participantId);
    return { gameId, roomId, participantId };
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateQuizGame: (state, action: PayloadAction<QuizGameDTO>) => {
      const newGame = action.payload;
      
      if (!state.quizGame) {
        // Premier jeu reçu
        state.quizGame = newGame;
        return;
      }

      // Logique de mise à jour conditionnelle pour éviter les re-rendus inutiles
      if (state.quizGame.currentQuestion?.id === newGame.currentQuestion?.id) {
        // Même question : ne pas mettre à jour currentQuestion, currentQuestionIndex, questions
        const { currentQuestion, currentQuestionIndex, questions, ...partial } = newGame;
        
        state.quizGame = {
          ...partial,
          currentQuestion: state.quizGame.currentQuestion,
          currentQuestionIndex: state.quizGame.currentQuestionIndex,
          questions: state.quizGame.questions,
        };
      } else {
        // Nouvelle question : mise à jour complète
        state.quizGame = newGame;
      }
    },
    
    handleJokerEffect: (state, action: PayloadAction<{ joker: JokerDTO; currentUsername: string }>) => {
      const { joker, currentUsername } = action.payload;
      
      if (joker.jokerType === JokerType.PRIORITE_REPONSE && joker.username !== currentUsername) {
        state.effetGlace = true;
        
        // L'effet se désactivera via clearEffetGlace après 8 secondes
      }
    },
    
    clearEffetGlace: (state) => {
      state.effetGlace = false;
    },
    
    setGameSubscriptionStatus: (state, action: PayloadAction<boolean>) => {
      state.hasSubscribedToGameUpdates = action.payload;
    },
    
    setJokerSubscriptionStatus: (state, action: PayloadAction<boolean>) => {
      state.hasSubscribedToJokerUpdates = action.payload;
    },
    
    clearGame: (state) => {
      state.quizGame = null;
      state.effetGlace = false;
      state.hasSubscribedToGameUpdates = false;
      state.hasSubscribedToJokerUpdates = false;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setJokerUsed: (state, action: PayloadAction<{ jokerType: string; used: boolean }>) => {
      const { jokerType, used } = action.payload;
      state.usedJokers[jokerType] = used;
    },
    setJokerMessage: (state, action: PayloadAction<{ jokerType: string; show: boolean }>) => {
      const { jokerType, show } = action.payload;
      state.jokerMessages[jokerType] = show;
    },

    resetJokersForNewGame: (state) => {
      state.usedJokers = {};
      state.jokerMessages = {};
    },

  },
  
  extraReducers: (builder) => {
    builder
      // Join Game
      .addCase(joinGame.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(joinGame.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(joinGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to join game';
      })
      // Start Game
      .addCase(startGame.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(startGame.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(startGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to start game';
      });
  },
});

export const { 
  updateQuizGame, 
  handleJokerEffect, 
  clearEffetGlace, 
  setGameSubscriptionStatus,
  setJokerSubscriptionStatus,
  clearGame, 
  setError,
  resetJokersForNewGame,
  setJokerMessage,
  setJokerUsed
} = gameSlice.actions;

export default gameSlice.reducer;
