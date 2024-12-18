import React from 'react';

import {ProfileInfo} from './ProfileInfo'
import { AuthWrapper } from './AuthWrapper';
import { useNavigate } from 'react-router-dom';
import { LogoutInfo } from './LogoutInfo';
import { SearchBar } from '../HomePage/SearchBar';

function Header(): JSX.Element {
  const homeNavigate = useNavigate();

  const homeClickNavigate = () => homeNavigate("/home")

  return (
    <div className="Header">
      <button type='button' onClick={homeClickNavigate}>Home</button>

      <AuthWrapper>
        <ProfileInfo />
        <LogoutInfo />
      </AuthWrapper>
      <SearchBar/>
    </div>
  );
}

export default Header;