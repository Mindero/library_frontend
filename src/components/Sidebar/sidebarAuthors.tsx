import { useNavigate } from 'react-router-dom';
import '../ui/Sidebar.css';
import { useDispatch } from 'react-redux';
import { setShowCatalogSideBar } from '../../reducer/settingsStore';
export const SidebarAuthors = () : JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateHandler = (to: string) => {
    dispatch(setShowCatalogSideBar(false));
    navigate(to);
  }

  return (
    <div>
      <div className='inner-choice' onClick={() => navigateHandler("/allAuthor")}>
        Все авторы
      </div>
  </div>
  )
}