import { Middleware } from '@reduxjs/toolkit';

export const cleanupMiddleware: Middleware = () => (next) => (action: any) => {
  const result = next(action);

  // Nettoyer les ressources lors de certaines actions
  if (action.type === 'room/leaveRoom' || action.type === 'game/endGame') {
    console.debug(`Cleanup triggered for: ${action.type}`);
  }

  return result;
};