import { useNavigate } from "react-router-dom";
import { AllAuthors } from "./AllAuthors";
import {Book} from "./Book";

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
      <div data-index={index} key={book.id_book}> 
        <p>Book name: <button onClick={() => onClick(book.id_book)}>{book.book_name}</button></p>
        <AllAuthors authors={book.authors}/>
        <hr/>
      </div>
    );
  });
  return (
    <>
      {res}
    </>
  );
}