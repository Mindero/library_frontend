import { useLocation} from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import '../../ui/SearchWrapper.css'
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";
import { Author, getAllAuthors } from "../../../Authors";
import { AuthorListToHtml } from "../../../util/authorListToHtml";
import { AuthorFilterForm } from "./AuthorFilterForm";

export const SearchAuthorPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(queryParams.entries());
  const { name, country} = params;
  params.type = "authors";
  const [authorsList, setAuthorsList] = useState<Author[]>([]);
  const filter = {
    country: country,
    name: name,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const params : any = {};
    if (name) params.name = name;
    if (country) params.country = country;

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
          <AuthorFilterForm filter={filter}/>
        </div>
        <div className="outter-book-list-container">
          <AuthorListToHtml authors={authorsList}/>
        </div>
      </div>
    </LoadingWrapper>
  )
}