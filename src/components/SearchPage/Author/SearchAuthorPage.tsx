import { Navigate, useLocation, useParams } from "react-router-dom"
import {Book, getBooksBy } from "../../../Book";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BookFilterForm } from "../Book/BookFilterForm";
import '../../ui/SearchWrapper.css'
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";
import { Author, getAllAuthors } from "../../../Authors";
import { AuthorListToHtml } from "../../../util/authorListToHtml";

export const SearchAuthorPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(queryParams.entries());
  const { name, country} = params;
  const [authorsList, setAuthorsList] = useState<Author[]>([]);
  // Для передачи фильтров в BookFilterForm
  const filter = {
    country: country,
    name: name,
    available: false,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const params : any = {};
    if (name) params.name = name;
    if (country) params.genre = country;

    getAllAuthors(params, dispatch).then((data) => {
      console.log(data);
      if (data !== undefined) setAuthorsList(data);
    });
  }, [name, country]);
  return (
    <LoadingWrapper dispatch={dispatch}>
      <div className="search-page">
        {/* Панель фильтров */}
        <div className="filters">
          {/* <BookFilterForm filter={filter} params={params}/> */}
        </div>
        <div className="outter-book-list-container">
          <AuthorListToHtml authors={authorsList}/>
        </div>
      </div>
    </LoadingWrapper>
  )
}