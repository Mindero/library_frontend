import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header/Header'
import {Route, Routes, Router, BrowserRouter, Link, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage'
import RegisterPage from './components/RegisterPage/RegsiterPage'
import LoginPage from './components/LoginPage/LoginPage';

import { userAuthSelector, userRoleSelector } from './reducer/userStore/reducer';
import { BookInfoPage } from './components/BookInfoPage/BookInfoPage';
import { AuthorInfoPage } from './components/AuthorInfoPage/AuthorInfoPage';
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { Role } from './util/roles';
import { ReadersTable } from './components/TablePages/ReaderTable/ReadersTable';
import { AuthorsTable } from './components/TablePages/AuthorsTable/AuthorsTable';
import { BooksTable } from './components/TablePages/BooksTable/BooksTable';
import { PublishersTable } from './components/TablePages/PublisherTable/PublisherTable';
import { GenresTable } from './components/TablePages/GenresTable/GenresTable';
import { BookGenresTable } from './components/TablePages/BookGenresTable/BookGenresTable';
import { BookInstanceTable } from './components/TablePages/BookInstance/BookInstanceTable';
import { BookPublisherTable } from './components/TablePages/BookPublisherTable/BookPublisherTable';
import { BookReaderTable } from './components/TablePages/BookReader/BookReaderTable';
import { PenaltyTable } from './components/TablePages/PenaltyTable/PenaltyTable';
import { AuthorsBookTable } from './components/TablePages/AuthorsBookView/AuthorsBookTable';
import { CatalogSidebar } from './components/Sidebar/CatalogSidebar';
import { getAllBooksGenres } from './Book';
import { useEffect } from 'react';
import { setAuthorCountries, setBooksGenres } from './reducer/catalogStore';
import { SearchWrapper } from './components/SearchPage/SearchWrapper';
import { getAllAuthorsCountry } from './Authors';
import "./components/ui/App.css"
import { SupplyView } from './components/TablePages/SupplyView/SupplyView';
import { OrderView } from './components/TablePages/OrderView/OrderView';
import { PenaltyView } from './components/TablePages/PenaltyView/PenaltyView';

interface ProtectedRouteInterface {
  expression: boolean;
  children: JSX.Element;
}

const ProtectedRoute = ({expression, children} : ProtectedRouteInterface) => {
  return expression ? children : <Navigate to ="/login"/>;
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllBooksGenres(dispatch).then((data) => {
      if (data !== undefined)
        dispatch(setBooksGenres(data));
    })

    getAllAuthorsCountry(dispatch).then((data) => {
      if (data !== undefined)
        dispatch(setAuthorCountries(data));
    });
  }, []);
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
            <Route path="/search" element={<SearchWrapper />} />
            <Route path="/book/:id_book" element={<BookInfoPage/>}/>
            <Route path="/author/:id_author" element={<AuthorInfoPage/>}/>
            <Route path="/readers" element={<ProtectedRoute expression={isAuth && role === Role[Role.ADMIN]}><ReadersTable neededRole={[Role.ADMIN]}/></ProtectedRoute>}/>
            <Route path="/authors" element={<ProtectedRoute expression={isAuth && role === Role[Role.ADMIN]}><AuthorsTable neededRole={[Role.ADMIN]}/></ProtectedRoute>}/>
            <Route path="/books" element={<ProtectedRoute expression={isAuth && role === Role[Role.ADMIN]}><BooksTable neededRole={[Role.ADMIN]}/></ProtectedRoute>}/>
            <Route path="/publishers" element={<ProtectedRoute expression={isAuth && role === Role[Role.ADMIN]}><PublishersTable neededRole={[Role.ADMIN]}/></ProtectedRoute>}/>
            <Route path="/genres" element={<ProtectedRoute expression={isAuth && role === Role[Role.ADMIN]}><GenresTable neededRole={[Role.ADMIN]}/></ProtectedRoute>}/>
            <Route path="/book_genres" element={<ProtectedRoute expression={isAuth && role === Role[Role.ADMIN]}><BookGenresTable neededRole={[Role.ADMIN]}/></ProtectedRoute>}/>
            <Route path="/book_instance" element={<ProtectedRoute expression={isAuth && role === Role[Role.ADMIN]}><BookInstanceTable neededRole={[Role.ADMIN]}/></ProtectedRoute>}/>
            <Route path="/book_publisher" element={<ProtectedRoute expression={isAuth && role === Role[Role.ADMIN]}><BookPublisherTable neededRole={[Role.ADMIN]}/></ProtectedRoute>}/>
            <Route path="/book_reader" element={<ProtectedRoute expression={isAuth && role === Role[Role.ADMIN]}><BookReaderTable neededRole={[Role.ADMIN]}/></ProtectedRoute>}/>
            <Route path="/penalty" element={<ProtectedRoute expression={isAuth && role === Role[Role.ADMIN]}><PenaltyTable neededRole={[Role.ADMIN]}/></ProtectedRoute>}/>
            <Route path="/authors_book" element={<ProtectedRoute expression={isAuth && role === Role[Role.ADMIN]}><AuthorsBookTable neededRole={[Role.ADMIN]}/></ProtectedRoute>}/>
            <Route path="/penaltyView" element={<ProtectedRoute expression={isAuth && role === Role[Role.ADMIN]}><PenaltyView neededRole={[Role.ADMIN]}/></ProtectedRoute>}/>
            <Route path="/supplyView" element={<ProtectedRoute expression={isAuth && role === Role[Role.ADMIN]}><SupplyView neededRole={[Role.ADMIN]}/></ProtectedRoute>}/>
            <Route path="/orderView" element={<ProtectedRoute expression={isAuth && role === Role[Role.ADMIN]}><OrderView neededRole={[Role.ADMIN]}/></ProtectedRoute>}/>
            <Route path="*" element={<div>Страница не найдена</div>}/>
          </Routes>
        <CatalogSidebar/>
      </div>
    </BrowserRouter>
  );
}

export default App;
