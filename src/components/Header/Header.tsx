import React from 'react';

import {ProfileInfo} from './ProfileInfo'
import { AuthWrapper } from './AuthWrapper';

function Header(): JSX.Element {
  return (
    <div className="Header">
      header
      <AuthWrapper>
        <ProfileInfo />
      </AuthWrapper>
    </div>
  );
}

export default Header;