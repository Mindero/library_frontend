import { useNavigate } from "react-router-dom";
import { Penalty } from "./PenaltyViewService";
import '../../ui/PenaltyListToHtml.css';
import { useState } from "react";

interface Props {
  penalties: Penalty[];
}

export const PenaltyListToHtml: React.FC<Props> = ({ penalties }) => {
  const navigate = useNavigate();

  const [openedPenalties, setOpenedPenalties] = useState<{ [key: string]: boolean }>({});

  const onClick = (id_book: number) => {
    navigate(`/book/${id_book}`);
  };

  // Переключаем видимость всех просроченных книг для конкретного читателя
  const togglePenaltyBooksVisibility = (readerTicket: number) => {
    setOpenedPenalties((prevState) => ({
      ...prevState,
      [readerTicket]: !prevState[readerTicket],
    }));
  };

  const res: JSX.Element[] = penalties.map((penalty, index) => {
    return (
      <div className="penalty-item" data-index={index} key={penalty.reader_ticket}>
        <h3 className="penalty-title">Читатель {penalty.reader_name}</h3>
        <div className="penalty-reader-info">
          <p className="penalty-reader-ticket">Номер читательского билет: {penalty.reader_ticket}</p>
          <p className="penalty-reader-email">Почта: {penalty.reader_email}</p>
        </div>

        {/* Кнопка для открытия/закрытия всех просроченных книг */}
        <div className="penalty-book-info">
          <h4
            onClick={() => togglePenaltyBooksVisibility(penalty.reader_ticket)}
            className={`penalty-toggle-books ${openedPenalties[penalty.reader_ticket] ? 'active' : ''}`}
          >
            {openedPenalties[penalty.reader_ticket] ? "Скрыть просроченные книги" : "Показать просроченные книги"}
          </h4>

          {/* Если книги открыты, отображаем список просроченных книг */}
          {openedPenalties[penalty.reader_ticket] && penalty.books.map((book) => (
            <div className="penalty-book" key={book.id_book_reader}>
              <p className="penalty-book-title">
                Название книги: <span className="penalty-book-name-button" onClick={() => onClick(book.id_book)}>
                  {book.book_name}
                </span>
              </p>
              <p className="penalty-book-publisher">Издатель: {book.publisher_name}</p>
              <div className="penalty-order-dates">
                <p>Дата начала просрочки: {book.start_time}</p>
                <p>Текущий штраф: {book.payment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  });

  return (
    <div className="penalty-list-container">{res}</div>
  );
};
