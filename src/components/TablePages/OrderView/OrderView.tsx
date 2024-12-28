import { useDispatch, useSelector } from "react-redux"
import { userJwtSelector } from "../../../reducer/userStore/reducer"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkAdmin } from "../Checker";
import { Role } from "../../../util/roles";
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";
import { getAllOrder, Order } from "./OrderViewService";
import { OrderListToHtml, OrderPenalty } from "./OrderListToHtml";
import { OrderViewFilter } from "./OrderViewFilter";
import { getAllPenalties, Penalty, PenaltyBook } from "../PenaltyView/PenaltyViewService";

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
  const [penaltyList, setPenaltyList] = useState<OrderPenalty[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
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
    setPenaltyList([]);
    const params : any = {};
    if (reader_name) params.reader_name = reader_name;
    if (reader_email) params.reader_email = reader_email;
    if (reader_ticket) params.reader_ticket = reader_ticket;
    if (book_name) params.book_name = book_name;
    if (publisher_name) params.publisher_name = publisher_name;
    if (borrow_date) params.borrow_date = borrow_date;
    if (end_date) params.end_date = end_date;

    getAllOrder(params, jwt as string, dispatch).then((data) => {
      if (data !== undefined){
        console.log("order ", data)
        setOrdersList(data);
        getAllPenalties({
          reader_name: params.reader_name,
          reader_email: params.reader_email,
          reader_ticket: params.reader_ticket,
        }, jwt as string, dispatch).then((data_penalty) => {
          if (data_penalty !== undefined && data_penalty.length > 0) {
              const books : PenaltyBook[] = data_penalty.map((x:Penalty) => x.books[0]);
              console.log("books ", books)
              const penalties : OrderPenalty[]  = data.map((order: Order) => {
                const penaltyBook = books.findIndex(
                (book : PenaltyBook) => {
                  return book.id_book_reader === order.id_book_reader
                }
                );
                console.log(penaltyBook);
                if (penaltyBook !== -1){
                  return {
                    start_time: books[penaltyBook].start_time,
                    payment: books[penaltyBook].payment,
                  }
                }
                else{
                  return {
                    start_time: "",
                    payment: -1,
                  }
                }
              });
              console.log("penalties ", penalties)
              setPenaltyList(penalties);
            }
            })
      }
    })
  }, [reader_name, reader_email, reader_ticket,
      book_name, publisher_name, borrow_date, end_date, refreshKey]);

  return (
    <LoadingWrapper dispatch={dispatch}>
      <div key={refreshKey} className="search-page">
        {/* Панель фильтров */}
        <div className="filters">
          <OrderViewFilter filter={filter} params={params}/>
        </div>
        <div className="outter-book-list-container">
          <OrderListToHtml orders={ordersList} penalties={penaltyList} 
              refreshKey={refreshKey} setRefreshKey={setRefreshKey}/>
        </div>
      </div>
    </LoadingWrapper>
  )
}