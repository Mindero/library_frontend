import { useNavigate } from 'react-router-dom';
import '../ui/Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCatalogSideBar } from '../../reducer/settingsStore';
import { navigateHandler } from '../../util/searchNavigateHandler';
import { catalogAuthorCountries } from '../../reducer/catalogStore/reducer';
export const SidebarAuthors = () : JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector(catalogAuthorCountries);

  return (
    <div>
      <div className='inner-choice' onClick={() =>{
        dispatch(setShowCatalogSideBar(false));
        navigateHandler({type:"authors"}, navigate)
      }}>
        Все авторы
      </div>

      <h3> Страна автора </h3>
        <ul>
          {countries.map((country : string) => {
            return (
              <li onClick={() =>{ 
                dispatch(setShowCatalogSideBar(false));
                navigateHandler({type:"authors", country: country}, navigate)}
                }>
                {country}
              </li>
            )
          })}
        </ul>
  </div>
  )
}