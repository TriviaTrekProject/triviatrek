import { configureStore } from '@reduxjs/toolkit';
import { errorHandlingMiddleware } from '../middleware/ErrorHandlingMiddleware';
import { loadingStatusMiddleware } from '../middleware/LoadingStatusMiddleware';
import { cleanupMiddleware } from '../middleware/CleanupActionMiddleware';
import uiReducer from '../slices/UxInteractionSlice.ts';
import roomReducer from '../slices/RoomSlice';
import gameReducer from '../slices/GameSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    room: roomReducer,
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['room/setSocketCallback', 'game/setSocketCallback'],
        ignoredPaths: ['room.socketCallbacks', 'game.socketCallbacks']
      }
    })
    .concat(errorHandlingMiddleware)
    .concat(loadingStatusMiddleware)
    .concat(cleanupMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;