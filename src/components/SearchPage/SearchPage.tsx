import { Navigate, useParams } from "react-router-dom"
import {Book, getBooksByName } from "../../Book";
import { useEffect, useState } from "react";
import { BookListToHtml } from "../../bookListToHtml";

export const SearchPage = () => {
  const {name} = useParams();

  const [booksList, setBooksList] = useState<Book[]>([]);

  useEffect(() => {
    (name === undefined) ? 
      <Navigate to ="/"/> :
      getBooksByName(name).then(data => {
        setBooksList(data);
      })
  }, []);
  
  return (
    <div>
      <BookListToHtml booksList={booksList}/>
    </div>
  )
}