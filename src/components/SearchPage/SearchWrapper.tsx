import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SearchBookPage } from "./Book/SearchBookPage";
import '../ui/SearchWrapper.css'
import { navigateHandler } from "../../util/searchNavigateHandler";
import { SearchAuthorPage } from "./Author/SearchAuthorPage";

export const SearchWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(queryParams.entries());
  const {type} = params;
  const handleSearchTypeChange = (type: 'books' | 'authors') => {
    params['type'] = type;
    navigateHandler(params, navigate);
  };

  const searching: { [key: string]: React.ReactNode }= {
    'books': <SearchBookPage/>,
    'authors': <SearchAuthorPage/>
  }

  return (
    <div className="search-wrapper">
      <div className="search-options">
        <button
          className={`search-option ${type === 'books' ? 'active' : ''}`}
          onClick={() => { 
            handleSearchTypeChange('books')
          }}
        >
          Товары
        </button>
        <button
          className={`search-option ${type === 'authors' ? 'active' : ''}`}
          onClick={() =>{ 
            handleSearchTypeChange('authors')
          }}
        >
          Авторы
        </button>
      </div>
      <div className="search-content">
        {searching[type]}
      </div>
    </div>
  );
};
