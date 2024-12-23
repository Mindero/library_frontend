interface SettingsState {
  loading: boolean;
  error: string | null;
  showModal: boolean;
  showCatalogSideBar: boolean
}

export const initialState: SettingsState = {
  loading: false,
  error: null,
  showModal: false,
  showCatalogSideBar: false,
};