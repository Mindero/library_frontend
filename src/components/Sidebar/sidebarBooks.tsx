import { useNavigate } from 'react-router-dom';
import '../ui/Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCatalogSideBar } from '../../reducer/settingsStore';
import { catalogBooksGenres } from '../../reducer/catalogStore/reducer';
import { Genre } from '../../reducer/catalogStore/initState';
import { navigateHandler } from '../../util/searchNavigateHandler';
export const SidebarBooks = () : JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genres : Genre[] = useSelector(catalogBooksGenres);

  return (
    <div>
      <div className='inner-choice' onClick={() =>{
        dispatch(setShowCatalogSideBar(false));
        navigateHandler({type:"books"}, navigate)}
        }>
        Все книги
      </div>
      <h3> Жанры книг </h3>
      <ul>
        {genres.map((genre : Genre) => {
          return (
            <li onClick={() =>{ 
              dispatch(setShowCatalogSideBar(false));
              navigateHandler({type:"books", genre: genre.name}, navigate)}
              }>
              {genre.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}