import {ProfileInfo} from './ProfileInfo'
import { AuthWrapper } from './AuthWrapper';
import { useNavigate } from 'react-router-dom';
import { LogoutInfo } from './LogoutInfo';
import { SearchBar } from './SearchBar';
import '../ui/Header.css'
import logo from '../image/logo.jpg'
import { Catalog } from './Catalog';

function Header(): JSX.Element {
  const homeNavigate = useNavigate();

  const homeClickNavigate = () => homeNavigate("/home")

  return (
    <div className="header-container">
      <div className="header">
        <button className="home-button" type="button" onClick={homeClickNavigate}><img src={logo} alt='Начальная страница'/></button>

        <div className='catalog'>
          <Catalog/>
          <SearchBar />
        </div>
        <div className="auth-section">
          <AuthWrapper>
            <div className="auth-container">
            <ProfileInfo />
            <LogoutInfo />
            </div>
          </AuthWrapper>
        </div>
      </div>
    </div>
  );
}

export default Header;