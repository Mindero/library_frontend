import { Provider, useSelector } from 'react-redux';
import Header from './components/Header/Header'
import {store} from './store';
import {Route, Routes, Router, BrowserRouter, Link, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage'
import RegisterPage from './components/RegisterPage/RegsiterPage'
import LoginPage from './components/LoginPage/LoginPage';
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { userAuthSelector, userJwtSelector } from './reducer/userStore/reducer';

interface ProtectedRouteInterface {
  expression: boolean;
  children: JSX.Element;
}

const ProtectedRoute = ({expression, children} : ProtectedRouteInterface) => {
  return expression ? children : <Navigate to ="/login"/>;
}

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
          <Header/>
          <Routes>
            <Route path="/" element={<Navigate to = "/home"/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/profile" element={<ProtectedRoute expression={useSelector(userAuthSelector)}><ProfilePage/></ProtectedRoute>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="*" element={<div>Not Found</div>}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
