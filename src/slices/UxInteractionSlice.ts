
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isLoading: boolean;
  isChatOpen: boolean;
  error: string | null;
}

const initialState: UIState = {
  isLoading: false,
  isChatOpen: false,
  error: null,
};

const uxInteractionSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setChatOpen: (state, action: PayloadAction<boolean>) => {
      state.isChatOpen = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setChatOpen, setError, clearError } = uxInteractionSlice.actions;
export default uxInteractionSlice.reducer;
