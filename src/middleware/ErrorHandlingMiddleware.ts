import { Middleware } from '@reduxjs/toolkit';

export const errorHandlingMiddleware: Middleware = () => (next) => (action: any) => {
  try {
    // Vérifier si c'est une action rejected d'un thunk
    if (action.type.endsWith('/rejected')) {
      console.error('Redux Error:', {
        type: action.type,
        error: action.error,
        payload: action.payload
      });
    }

    return next(action);
  } catch (error) {
    console.error('Middleware Error:', error);
    return next(action);
  }
};