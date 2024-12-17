import { useEffect, useState } from "react"
import Book, { getAllBooks } from "../../Book";
import { bookListToHtml } from "../../bookListToHtml";

export const AllBooks = () => {
  const [booksList, setBooksList] = useState<Array<Book>>([]);

  useEffect(() => {
    getAllBooks().then(data => {
      setBooksList(data);
    })
  }, []);

  return (
    <div>
      <hr/>
      {bookListToHtml(booksList)}
    </div>
  )
}