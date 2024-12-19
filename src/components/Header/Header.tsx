import React from 'react';

import {ProfileInfo} from './ProfileInfo'
import { AuthWrapper } from './AuthWrapper';
import { useNavigate } from 'react-router-dom';
import { LogoutInfo } from './LogoutInfo';
import { SearchBar } from '../HomePage/SearchBar';
import '../ui/Header.css'

function Header(): JSX.Element {
  const homeNavigate = useNavigate();

  const homeClickNavigate = () => homeNavigate("/home")

  return (
    <div className="header-container">
      <div className="header">
        <button className="home-button" type="button" onClick={homeClickNavigate}>Home</button>

        <div className="auth-section">
          <AuthWrapper>
            <div className="auth-container">
            <ProfileInfo />
            <LogoutInfo />
            </div>
          </AuthWrapper>
        </div>

        <div className="search-bar">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default Header;