import { useNavigate } from "react-router-dom";
import { AllAuthors } from "./AllAuthors";
import {Book} from "./Book";
import './components/ui/bookListToHtml.css'

interface BooksProps {
  booksList: Book[];
}
export const BookListToHtml = ({booksList} : BooksProps) : JSX.Element => {
  const navigate = useNavigate();

  const onClick = (id_book:number) => {
    navigate(`/book/${id_book}`)
  }

  const res: JSX.Element[] = booksList.map((book, index) => {
    // Добавляем return перед JSX
    return (
      <div className="book-item" data-index={index} key={book.id_book}>
        <p>
          Book name: <button className="book-name" onClick={() => onClick(book.id_book)}>{book.book_name}</button>
        </p>
        <AllAuthors authors={book.authors} />
        <hr className="separator" />
      </div>
    );
  });
  return (
    <div className="book-list-container">{res}</div>
  );
}