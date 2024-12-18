import React from 'react';

import { AuthContainer } from './AuthContainer';
import { useSelector } from 'react-redux';
import { userAuthSelector, userJwtSelector } from '../../reducer/userStore/reducer';

interface AuthWrapperPros {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperPros> = ({children}) => {
  const isAuth = useSelector(userAuthSelector);
  const jwt = useSelector(userJwtSelector);
  // console.log(`isAuth = ${isAuth}`);
  //console.log(`JWT = ${jwt}`);
  return (
    <div>
      {isAuth ? children:
      (<AuthContainer/>)}
    </div>
  );

}