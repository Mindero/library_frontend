import { slice } from './reducer';

export const{
  setIsAuth,
  setJwt,
  setRole,
} = slice.actions;

export default slice.reducer;