import { Provider, useSelector } from 'react-redux';
import Header from './components/Header/Header'
import {store} from './store';
import {Route, Routes, Router, BrowserRouter, Link, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage'
import RegisterPage from './components/RegisterPage/RegsiterPage'
import LoginPage from './components/LoginPage/LoginPage';

import { userAuthSelector, userJwtSelector, userRoleSelector } from './reducer/userStore/reducer';
import { SearchPage } from './components/SearchPage/SearchPage';
import { BookInfoPage } from './components/BookInfoPage/BookInfoPage';
import { AuthorInfoPage } from './components/AuthorInfoPage/AuthorInfoPage';
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { Role } from './util/roles';
import { ReadersTable } from './components/TablePages/ReaderTable/ReadersTable';

interface ProtectedRouteInterface {
  expression: boolean;
  children: JSX.Element;
}

const ProtectedRoute = ({expression, children} : ProtectedRouteInterface) => {
  return expression ? children : <Navigate to ="/login"/>;
}

function App() {
  const isAuth : boolean= useSelector(userAuthSelector);
  const role : string | null = useSelector(userRoleSelector);
  return (
    <BrowserRouter>
      <div className='App'>
          <Header/>
          <Routes>
            <Route path="/" element={<Navigate to = "/home"/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/profile" element={<ProtectedRoute expression={isAuth}><ProfilePage/></ProtectedRoute>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/search/:name" element={<SearchPage/>}/>
            <Route path= "/book/:id_book" element={<BookInfoPage/>}/>
            <Route path= "/author/:id_author" element={<AuthorInfoPage/>}/>
            <Route path="/readers" element={<ProtectedRoute expression={isAuth && role === Role[Role.ADMIN]}><ReadersTable neededRole={[Role.ADMIN]}/></ProtectedRoute>}/>
            <Route path="*" element={<div>Not Found</div>}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
