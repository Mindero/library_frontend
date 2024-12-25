import { useDispatch, useSelector } from "react-redux"
import { userJwtSelector } from "../../../reducer/userStore/reducer"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkAdmin } from "../Checker";
import { Role } from "../../../util/roles";
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";
import { getAllOrder, Order } from "./OrderViewService";
import { OrderListToHtml } from "./OrderListToHtml";
import { OrderViewFilter } from "./OrderViewFilter";

export const OrderView = ({neededRole} :{neededRole: Role[]}) => {
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
  const { reader_name, reader_email, reader_ticket,
    book_name, publisher_name, borrow_date, end_date,
   } = params;
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  // Для передачи фильтров в BookFilterForm
  const filter = {
    reader_name: reader_name, 
    reader_email: reader_email,
    reader_ticket: reader_ticket,
    book_name: book_name,
    publisher_name: publisher_name,
    borrow_date: borrow_date,
    end_date: end_date,
  };

  

  useEffect(() => {
    setOrdersList([]);
    const params : any = {};
    if (reader_name) params.reader_name = reader_name;
    if (reader_email) params.reader_email = reader_email;
    if (reader_ticket) params.reader_ticket = reader_ticket;
    if (book_name) params.book_name = book_name;
    if (publisher_name) params.publisher_name = publisher_name;
    if (borrow_date) params.borrow_date = borrow_date;
    if (end_date) params.end_date = end_date;

    getAllOrder(params, jwt as string, dispatch).then((data) => {
      if (data !== undefined) 
        setOrdersList(data);
    })
  }, [reader_name, reader_email, reader_ticket,
      book_name, publisher_name, borrow_date, end_date,]);

  return (
    <LoadingWrapper dispatch={dispatch}>
      <div className="search-page">
        {/* Панель фильтров */}
        <div className="filters">
          <OrderViewFilter filter={filter} params={params}/>
        </div>
        <div className="outter-book-list-container">
          <OrderListToHtml orders={ordersList}/>
        </div>
      </div>
    </LoadingWrapper>
  )
}