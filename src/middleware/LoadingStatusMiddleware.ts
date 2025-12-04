import { Middleware } from '@reduxjs/toolkit';

export const loadingStatusMiddleware: Middleware = () => (next) => (action: any) => {
  // Log les états de chargement pour le debugging
  if (action.type.endsWith('/pending')) {
    console.debug(`Loading started: ${action.type}`);
  } else if (action.type.endsWith('/fulfilled')) {
    console.debug(`Loading completed: ${action.type}`);
  } else if (action.type.endsWith('/rejected')) {
    console.debug(`Loading failed: ${action.type}`);
  }

  return next(action);
};