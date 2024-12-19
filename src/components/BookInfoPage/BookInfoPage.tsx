import { Navigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { AllAuthors } from "../../AllAuthors";
import { Book, getBookFormById } from "../../Book";
import { BookInstance } from "./BookInstance";
import { useDispatch } from "react-redux";
import { LoadingWrapper } from "../LoadingWrapper/settingsLoading";

export const BookInfoPage = () => {
  const {id_book} = useParams();
  if (id_book === undefined) <Navigate to = "/"/>
  const id : number = Number(id_book);
  const [bookForm, setBookForm] = useState<Book>({
    "id_book": Number(id_book),
    "book_name": "",
    "authors":[],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    getBookFormById(id, dispatch).then(data => {
      if (data !== undefined){
        setBookForm(data);
        console.log(data);
      }
    });
  }, [id_book]);

  return (
    <div>
      <LoadingWrapper dispatch={dispatch}>
        <h1>{bookForm.book_name}</h1>
        <AllAuthors authors={bookForm.authors} />
        <BookInstance id_book={id}/>
      </LoadingWrapper>
    </div>
  )
}

