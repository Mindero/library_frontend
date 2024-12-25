import { useDispatch, useSelector } from "react-redux"
import { userJwtSelector } from "../../../reducer/userStore/reducer"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkAdmin } from "../Checker";
import { Role } from "../../../util/roles";
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";
import { Book } from "../../../Book";
import { getSupplyBooks, SupplyBook } from "./SupplyViewService";
import { SupplyListToHtml } from "./SupplyListToHtml";
import { SupplyViewFilter } from "./SupplyViewFilter";

export const SupplyView = ({neededRole} :{neededRole: Role[]}) => {
  const jwt : string | null = useSelector(userJwtSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (jwt === null) {
      console.log("JWT is null, redirecting to home");
      navigate("/");
      return;
    }

    // Проверяем роль пользователя
    checkAdmin(jwt, dispatch)
      .then((data) => {
        if (data !== undefined){
          // console.log("User role:", data);
          const roleValue = Role[data as keyof typeof Role];
          if (!neededRole.includes(roleValue)) {
            // console.log("User role not allowed, redirecting to home");
            navigate("/");
          } else {
            // console.log("User role is allowed");
          }
        }
      });
  }, [jwt]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(queryParams.entries());
  const { start_date, end_date, book_name, author_name } = params;
  const [booksList, setBooksList] = useState<SupplyBook[]>([]);
  // Для передачи фильтров в BookFilterForm
  const filter = {
    start_date: start_date,
    end_date: end_date,
    book_name: book_name,
    author_name: author_name,
  };

  

  useEffect(() => {
    setBooksList([]);
    const params : any = {};
    if (start_date) params.start_date = start_date;
    if (end_date) params.end_date = end_date;
    if (book_name) params.book_name = book_name;
    if (author_name) params.author_name = author_name;

    getSupplyBooks(params, jwt as string, dispatch).then((data) => {
      if (data !== undefined) 
        setBooksList(data);
    })
  }, [start_date, end_date, book_name, author_name]);

  return (
    <LoadingWrapper dispatch={dispatch}>
      <div className="search-page">
        {/* Панель фильтров */}
        <div className="filters">
          <SupplyViewFilter filter={filter} params={params}/>
        </div>
        <div className="outter-book-list-container">
          <SupplyListToHtml books={booksList}/>
        </div>
      </div>
    </LoadingWrapper>
  )
}