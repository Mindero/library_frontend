import { SupplyBook } from "./SupplyViewService"
import '../../ui/bookListToHtml.css'
import { useNavigate } from "react-router-dom";
import { AllAuthors } from "../../../util/AllAuthors";

interface Props {
  books : SupplyBook[]
}
export const SupplyListToHtml:React.FC<Props> = ({books}) => {
  const navigate = useNavigate();

  const onClick = (id_book:number) => {
    navigate(`/book/${id_book}`)
  }

  const res: JSX.Element[] = books.map((book, index) => {
    return (
      <div className="book-item" data-index={index} key={book.id_book} onClick={() => onClick(book.id_book)}>
        <p className="book-name">
          Название книги: <button className="book-name-button">{book.book_name}</button>
        </p>
        <p>
          Издатель: {book.publisher_name}
        </p>
        <p>
          Кол-во поставленных книг: {book.count}
        </p>
        <p>
          Дата поставки: {book.supply_date}
        </p>
        {
          <AllAuthors authors={book.authors}/>
        }
      </div>
    );
  });
  return (
    <div className="book-list-container">{res}</div>
  );
}