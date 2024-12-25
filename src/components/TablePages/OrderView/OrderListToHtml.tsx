import { useNavigate } from "react-router-dom";
import { AllAuthors } from "../../../util/AllAuthors";
import { Order } from './OrderViewService';
import '../../ui/OrderList.css';

interface Props {
  orders : Order[];
}
export const OrderListToHtml:React.FC<Props> = ({orders}) => {
  const navigate = useNavigate();

  const onClick = (id_book:number) => {
    navigate(`/book/${id_book}`);
  };

  const res: JSX.Element[] = orders.map((order, index) => {
    return (
      <div className="order-item" data-index={index} key={order.id_book_reader}>
        <h3 className="order-title">Заказ № {order.id_book_reader}</h3>
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
      </div>
    );
  });
  return (
    <div className="order-list-container">{res}</div>
  );
};
