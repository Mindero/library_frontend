import { Navigate, useParams } from "react-router-dom"
import Book, { getBooksByName } from "../../Book";
import { useEffect, useState } from "react";
import { bookListToHtml } from "../../bookListToHtml";

export const SearchPage = () => {
  const {name} = useParams();

  const [booksList, setBooksList] = useState<Array<Book>>([]);

  useEffect(() => {
    (name === undefined) ? 
      <Navigate to ="/"/> :
      getBooksByName(name).then(data => {
        setBooksList(data);
      })
  }, []);
  
  return (
    <div>
      {bookListToHtml(booksList)}
    </div>
  )
}