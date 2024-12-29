import { useLocation} from "react-router-dom"
import {Book, getBooksBy } from "../../../Book";
import { useEffect, useState } from "react";
import { BookListToHtml } from '../../../util/bookListToHtml';
import { useDispatch } from "react-redux";
import { BookFilterForm } from "./BookFilterForm";
import '../../ui/SearchWrapper.css'
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";

export const SearchBookPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(queryParams.entries());
  const { available, name, genre, year_left, year_right } = params;
  const [booksList, setBooksList] = useState<Book[]>([]);
  // Для передачи фильтров в BookFilterForm
  const filter = {
    genre: genre,
    year_left: year_left,
    year_right: year_right,
    name: name,
    available: (available === "true"),
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const params : any = {};  
    if (name) params.name = name;
    if (genre) params.genre = genre;
    if (year_left) params.year_left = year_left;
    if (year_right) params.year_right = year_right;
    if (available) params.available = available;
    else params.available = false;

    getBooksBy(params, dispatch).then((data) => {
      if (data !== undefined)
        setBooksList(data);
    })
  }, [available, name, genre, year_left, year_right]);
  return (
    <LoadingWrapper dispatch={dispatch}>
      <div className="search-page">
        {/* Панель фильтров */}
        <div className="filters">
          <BookFilterForm filter={filter}/>
        </div>
        <div className="outter-book-list-container">
          <BookListToHtml booksList={booksList} showAuthors={true} />
        </div>
      </div>
    </LoadingWrapper>
  )
}