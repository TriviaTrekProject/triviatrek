import { RootState } from '../store';

export const selectQuizGame = (state: RootState) => state.game.quizGame;
export const selectEffetGlace = (state: RootState) => state.game.effetGlace;
export const selectGameLoading = (state: RootState) => state.game.isLoading;
export const selectGameError = (state: RootState) => state.game.error;
