import { Navigate, useParams } from "react-router-dom"
import {Book, getBooksByName } from "../../Book";
import { useEffect, useState } from "react";
import { BookListToHtml } from "../../bookListToHtml";
import { useDispatch } from "react-redux";

export const SearchPage = () => {
  const {name} = useParams();

  const [booksList, setBooksList] = useState<Book[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    (name === undefined) ? 
      <Navigate to ="/"/> :
      getBooksByName(name, dispatch).then(data => {
        if (data !== undefined)
          setBooksList(data);
      })
  }, []);
  
  return (
    <div>
      <BookListToHtml booksList={booksList}/>
    </div>
  )
}