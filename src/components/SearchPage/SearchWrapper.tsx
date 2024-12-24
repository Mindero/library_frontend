import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SearchBookPage } from "./Book/SearchBookPage";
import '../ui/SearchWrapper.css'
import { getNewParamsPath } from "./SearchService";
import { LoadingWrapper } from "../LoadingWrapper/settingsLoading";
import { navigateHandler } from "../../util/searchNavigateHandler";
import { SearchAuthorPage } from "./Author/SearchAuthorPage";

export const SearchWrapper = () => {
  const [searchType, setSearchType] = useState<'books' | 'authors'>('books');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(queryParams.entries());

  const handleSearchTypeChange = (type: 'books' | 'authors') => {
    setSearchType(type);
    params['type'] = type;
    // Навигация по новому пути
    navigateHandler(params, navigate);
  };

  const searching = {
    'books': <SearchBookPage/>,
    'authors': <SearchAuthorPage/>
  }

  return (
    <div className="search-wrapper">
      <div className="search-options">
        <button
          className={`search-option ${searchType === 'books' ? 'active' : ''}`}
          onClick={() => { 
            handleSearchTypeChange('books')
          }}
        >
          Товары
        </button>
        <button
          className={`search-option ${searchType === 'authors' ? 'active' : ''}`}
          onClick={() =>{ 
            handleSearchTypeChange('authors')
          }}
        >
          Авторы
        </button>
      </div>
      <div className="search-content">
        {searching[searchType]}
      </div>
    </div>
  );
};
