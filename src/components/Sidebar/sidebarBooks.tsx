import { useNavigate } from 'react-router-dom';
import '../ui/Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCatalogSideBar } from '../../reducer/settingsStore';
import { catalogBooksGenres } from '../../reducer/catalogStore/reducer';
import { Genre } from '../../reducer/catalogStore/initState';
export const SidebarBooks = () : JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateHandler = (to: string) => {
    dispatch(setShowCatalogSideBar(false));
    navigate(to);
  }
  const genres : Genre[] = useSelector(catalogBooksGenres);

  return (
    <div>
      <div className='inner-choice' onClick={() => navigateHandler("/allBooks")}>
        Все книги
      </div>
      <h3> Жанры книг </h3>
      <ul>
        {genres.map((genre : Genre) => {
          return (
            <li onClick={() => navigateHandler(`/books/genre={${genre.url}}`)}>
              {genre.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}