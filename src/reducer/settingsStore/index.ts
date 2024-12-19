import { settingsSlice } from './reducer';

export const{
  setError,
  startLoading,
  stopLoading,
  clearError,
  showModal,
  disableModal
} = settingsSlice.actions;

export default settingsSlice.reducer;