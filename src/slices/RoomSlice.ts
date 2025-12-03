import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RoomDTO } from '../model/RoomDTO';
import { ParticipantDTO } from '../model/QuizGameDTO';
import { roomApi } from '../api/roomApi';

interface RoomState {
  room: RoomDTO | null;
  users: ParticipantDTO[];
  currentParticipantId: string | null;
  tempId: string | null;
  hasJoined: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  room: null,
  users: [],
  currentParticipantId: null,
  tempId: null,
  hasJoined: false,
  isLoading: false,
  error: null,
};

export const joinRoom = createAsyncThunk(
  'room/joinRoom',
  async ({ roomId, username, tempId }: { roomId: string; username: string; tempId: string }) => {
    // Appel async - ne bloque pas le rendu
    await roomApi.join(roomId, username, tempId);
    return { roomId, username, tempId };
  }
);

export const leaveRoom = createAsyncThunk(
  'room/leaveRoom',
  async ({ roomId, username }: { roomId: string; username: string }) => {
    await roomApi.leave(roomId, username);
    return { roomId, username };
  }
);

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setTempId: (state, action: PayloadAction<string>) => {
      state.tempId = action.payload;
    },
    updateRoom: (state, action: PayloadAction<RoomDTO>) => {
      state.room = action.payload;
      state.users = action.payload.participants;

      // Identifier le participant actuel via tempId (seulement si on ne l'a pas déjà)
      if (!state.currentParticipantId && state.tempId) {
        const currentParticipant = action.payload.participants.find(
          (p: ParticipantDTO) => p.tempId === state.tempId
        );
        if (currentParticipant) {
          state.currentParticipantId = currentParticipant.participantId;
        }
      }
    },
    clearRoom: (state) => {
      state.room = null;
      state.users = [];
      state.currentParticipantId = null;
      state.hasJoined = false;
      state.tempId = null; // Reset tempId aussi
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Join Room
      .addCase(joinRoom.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(joinRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasJoined = true;
        // tempId est déjà défini, pas besoin de le redéfinir
      })
      .addCase(joinRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to join room';
      })
      // Leave Room
      .addCase(leaveRoom.fulfilled, (state) => {
        state.room = null;
        state.users = [];
        state.currentParticipantId = null;
        state.hasJoined = false;
        state.tempId = null; // Reset tempId
      });
  },
});

export const { setTempId, updateRoom, clearRoom, setError } = roomSlice.actions;
export default roomSlice.reducer;