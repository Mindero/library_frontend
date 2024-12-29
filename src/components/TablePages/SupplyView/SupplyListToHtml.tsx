import { delete_supply, deleteSupply, SupplyBook } from "./SupplyViewService";
import '../../ui/bookListToHtml.css';
import { useNavigate } from "react-router-dom";
import { AllAuthors } from "../../../util/AllAuthors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userJwtSelector } from "../../../reducer/userStore/reducer";

interface Props {
  books: SupplyBook[];
  refreshKey: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>
}

export const SupplyListToHtml: React.FC<Props> = ({ books, refreshKey, setRefreshKey }) => {
  const navigate = useNavigate();
  const jwt = useSelector(userJwtSelector);
  const dispatch = useDispatch();

  const onClick = (id_book: number) => {
    navigate(`/book/${id_book}`);
  };
  const [deleted, setDeleted] = useState<deleteSupply>();

  useEffect(() => {
    if (deleted !== undefined && jwt !== null){
      delete_supply(deleted, jwt, dispatch).then(()=>{
        setDeleted(undefined);
        setRefreshKey(refreshKey => refreshKey + 1); // Изменение ключа, чтобы перерендерить компонент
      });
    }
  }, [deleted]);

  const res: JSX.Element[] = books.map((book, index) => {
    return (
      <div className="book-item" data-index={index} key={book.id_book}>
        <div className="book-header">
          <span
            className="delete-icon"
            title="Удалить поставку"
            onClick={(e) => {
              e.stopPropagation(); // Остановить всплытие события, чтобы не вызывался navigate
              setDeleted({
                id_book: book.id_book,
                supply_date: book.supply_date,
                publisher_name: book.publisher_name
              });
            }}
          >
            ✖
          </span>
          <p className="book-name">
            Название книги:{" "}
            <span className="book-name-link" onClick={() => onClick(book.id_book)}>
              {book.book_name}
            </span>
          </p>
        </div>
        <p>Издатель: {book.publisher_name}</p>
        <p>Кол-во поставленных книг: {book.count}</p>
        <p>Дата поставки: {book.supply_date}</p>
        <AllAuthors authors={book.authors} />
      </div>
    );
  });

  return <div className="book-list-container">{res}</div>;
};
