import React from 'react';

import {ProfileInfo} from './ProfileInfo'
import { AuthWrapper } from './AuthWrapper';
import { useNavigate } from 'react-router-dom';

function Header(): JSX.Element {
  const homeNavigate = useNavigate();

  const homeClickNavigate = () => homeNavigate("/home")

  return (
    <div className="Header">
      <button type='button' onClick={homeClickNavigate}>Home</button>

      <p> header </p>
      <AuthWrapper>
        <ProfileInfo />
      </AuthWrapper>
    </div>
  );
}

export default Header;