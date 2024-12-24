import { useNavigate } from "react-router-dom";
import { AllAuthors } from "./AllAuthors";
import {Book} from "../Book";
import '../components/ui/bookListToHtml.css'

interface BooksProps {
  booksList: Book[],
  showAuthors : boolean,
}
export const BookListToHtml = ({booksList, showAuthors} : BooksProps) : JSX.Element => {
  const navigate = useNavigate();

  const onClick = (id_book:number) => {
    navigate(`/book/${id_book}`)
  }

  const res: JSX.Element[] = booksList.map((book, index) => {
    return (
      <div className="book-item" data-index={index} key={book.id_book} onClick={() => onClick(book.id_book)}>
        <p className="book-name">
          Название книги: <button className="book-name-button">{book.book_name}</button>
        </p>
        {
          (showAuthors) ? <AllAuthors authors={book.authors} /> : <></>
        }
      </div>
    );
  });
  return (
    <div className="book-list-container">{res}</div>
  );
}