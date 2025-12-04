import { RootState } from '../store';

export const selectRoom = (state: RootState) => state.room.room;
export const selectUsers = (state: RootState) => state.room.users;
export const selectCurrentParticipantId = (state: RootState) => state.room.currentParticipantId;
export const selectRoomLoading = (state: RootState) => state.room.isLoading;
export const selectRoomError = (state: RootState) => state.room.error;
export const selectHasJoined = (state: RootState) => state.room.hasJoined;
