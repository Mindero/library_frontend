interface userStoreInterface {
  isAuth: boolean,
  jwt: string | null,
  role: string | null,
}

export const initialState: userStoreInterface = {
  isAuth: false,
  jwt: null,
  role: null
};