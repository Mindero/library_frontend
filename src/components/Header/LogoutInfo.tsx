import React from 'react';
import { setIsAuth, setJwt, setRole } from '../../reducer/userStore';
import { useDispatch } from 'react-redux';

export const LogoutInfo = () => {

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(setJwt(""));
    dispatch(setIsAuth(false));
    dispatch(setRole(""));
  }
  
  return (
    <div>
      <button className = "auth-button register-button" type = "button" onClick={logoutHandler}> Выйти </button>
    </div>
  )
}