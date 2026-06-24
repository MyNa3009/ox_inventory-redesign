import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  rarityStyle: string;
}

const initialState: UiState = {
  rarityStyle: 'glow',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setRarityStyle(state, action: PayloadAction<string>) {
      state.rarityStyle = action.payload;
    },
  },
});

export const { setRarityStyle } = uiSlice.actions;

export default uiSlice.reducer;
