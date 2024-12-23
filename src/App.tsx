import { Provider, useDispatch, useSelector } from 'react-redux';
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
import { AllBooks } from './components/HomePage/AllBooks';
import { AllAuthorsInfo } from './components/HomePage/AllAuthorsInfo';
import { PenaltyReadersTable } from './components/TablePages/PenaltyReaders/PenaltyReaders';
import { CatalogSidebar } from './components/Sidebar/CatalogSidebar';
import { setShowCatalogSideBar } from './reducer/settingsStore';
import { settingsShowCatalogSideBar } from './reducer/settingsStore/reducer';
import { getAllBooksGenres } from './Book';
import { useEffect } from 'react';
import { setBooksGenres } from './reducer/catalogStore';

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
      console.log(data);
      if (data !== undefined)
        dispatch(setBooksGenres(data));
    })
  }, []);
  const isAuth : boolean= useSelector(userAuthSelector);
  const role : string | null = useSelector(userRoleSelector);
  const sidebar = useSelector(settingsShowCatalogSideBar);
  return (
    <BrowserRouter>
      <div className='App'>
          <Header/>
          <Routes>
            <Route path="/" element={<Navigate to = "/home"/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/allBooks" element={<AllBooks/>}/>
            <Route path="/allAuthor" element={<AllAuthorsInfo/>}/>
            <Route path="/profile" element={<ProtectedRoute expression={isAuth}><ProfilePage/></ProtectedRoute>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/search/:name" element={<SearchPage/>}/>
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
            <Route path="/allPenaltyReader" element={<ProtectedRoute expression={isAuth && role === Role[Role.ADMIN]}><PenaltyReadersTable neededRole={[Role.ADMIN]}/></ProtectedRoute>}/>
            <Route path="*" element={<div>Страница не найдена</div>}/>
          </Routes>
        <CatalogSidebar/>
      </div>
    </BrowserRouter>
  );
}

export default App;
