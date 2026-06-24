import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlotWithItem } from '../typings';

interface SplitModalState {
  item: SlotWithItem | null;
}

const initialState: SplitModalState = {
  item: null,
};

export const splitModalSlice = createSlice({
  name: 'splitModal',
  initialState,
  reducers: {
    openSplitModal(state, action: PayloadAction<SlotWithItem>) {
      state.item = action.payload;
    },
    closeSplitModal(state) {
      state.item = null;
    },
  },
});

export const { openSplitModal, closeSplitModal } = splitModalSlice.actions;

export default splitModalSlice.reducer;
