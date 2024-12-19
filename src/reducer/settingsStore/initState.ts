interface SettingsState {
  loading: boolean;
  error: string | null;
  showModal: boolean;
}

export const initialState: SettingsState = {
  loading: false,
  error: null,
  showModal: false,
};