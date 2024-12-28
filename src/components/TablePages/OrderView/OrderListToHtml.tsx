import { useNavigate } from "react-router-dom";
import { AllAuthors } from "../../../util/AllAuthors";
import { add_penalty, delete_penalty, Order } from './OrderViewService';
import '../../ui/OrderList.css';
import { Penalty, PenaltyBook } from "../PenaltyView/PenaltyViewService";
import { useDispatch, useSelector } from "react-redux";
import { userJwtSelector } from "../../../reducer/userStore/reducer";

export interface OrderPenalty{
  start_time: string,
  payment: number,
}

interface Props {
  orders : Order[];
  penalties: OrderPenalty[];
  refreshKey:number;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>
}
export const OrderListToHtml:React.FC<Props> = ({orders, penalties, refreshKey, setRefreshKey}) => {
  const navigate = useNavigate();
  const onClick = (id_book:number) => {
    navigate(`/book/${id_book}`);
  };

  const jwt = useSelector(userJwtSelector);
  const dispatch = useDispatch();

  const addPenalty = (id_book_reader: number) => {
    if (jwt !== null){
      const date = new Date();
      const formattedDate = date.toISOString().split('T')[0];
      add_penalty({
        id_book_reader: id_book_reader,
        start_time: formattedDate,
        payment: 10,
      }, jwt, dispatch).then((data) => {
        setRefreshKey(refreshKey + 1);
      })
    }
  }
  const deletePenalty = (id_book_reader: number) => {
    if (jwt !== null){
      delete_penalty(id_book_reader, jwt, dispatch).then((data) => {
        setRefreshKey(refreshKey + 1);
      })
    }
  }
    const res: JSX.Element[] = orders.map((order, index) => {
      return (
        <div className="order-item" data-index={index} key={order.id_book_reader}>
        <h3 className="order-title">Заказ № {order.id_book_reader}</h3>
        {new Date(order.end_date) < new Date()? (
          (penalties !== undefined && penalties.length > index && penalties[index].payment !== -1) ? (
            <button type='button' className="order-penalty-button" onClick={() => deletePenalty(order.id_book_reader)}>
            Читатель вернул книгу
            </button>
          ) : (
            <button type='button' className="order-penalty-button" onClick={() => addPenalty(order.id_book_reader)}>
            Читатель не вернул книгу
          </button>
          )
        ) : (
          <></>
        )}
        <div className="order-reader-info">
          <h4>Читатель</h4>
          <p className="reader-ticket">Читательский билет: {order.reader_ticket}</p>
          <p className="reader-name">Имя: {order.reader_name}</p>
          <p className="reader-email">Почта: {order.reader_email}</p>
        </div>
        <div className="order-book-info">
          <h4>Книга</h4>
          <p className="book-title">
            Название книги: <span className="order-book-name-button" onClick={() => onClick(order.id_book)}>
              {order.book_name}
            </span>
          </p>
          <p className="book-publisher">Издатель: {order.publisher_name}</p>
        </div>  
        <div className="order-dates">
          <h4>Даты</h4>
          <p>Дата выдачи заказа: {order.borrow_date}</p>
          <p>Дата возвращения заказа читателем: {order.end_date}</p>
        </div>
        {penalties !== undefined && penalties.length > index && penalties[index].payment !== -1? (
          <div className="order-penalty">
            <h4>Просрочена сдача</h4>
            <p>Дата начала просрока {penalties[index].start_time}</p>
            <p>Штраф {penalties[index].payment}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  });
  return (
    <div key={refreshKey} className="order-list-container">
      {res}
      </div>
  );
};
