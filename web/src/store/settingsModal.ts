import { createSlice } from '@reduxjs/toolkit';

interface SettingsModalState {
  open: boolean;
  notifEditing: boolean;
}

const initialState: SettingsModalState = {
  open: false,
  notifEditing: false,
};

export const settingsModalSlice = createSlice({
  name: 'settingsModal',
  initialState,
  reducers: {
    openSettings(state) {
      state.open = true;
    },
    closeSettings(state) {
      state.open = false;
    },
    openNotifEditor(state) {
      state.open = false;
      state.notifEditing = true;
    },
    closeNotifEditor(state) {
      state.notifEditing = false;
    },
  },
});

export const { openSettings, closeSettings, openNotifEditor, closeNotifEditor } = settingsModalSlice.actions;

export default settingsModalSlice.reducer;
