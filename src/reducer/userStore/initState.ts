interface userStoreInterface {
  isAuth: boolean,
  jwt: string | null,
}

export const initialState: userStoreInterface = {
  isAuth: false,
  jwt: null,
};