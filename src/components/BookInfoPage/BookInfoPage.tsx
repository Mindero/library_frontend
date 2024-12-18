import { Navigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { AllAuthors } from "../../AllAuthors";
import { Book, getBookFormById } from "../../Book";
import { BookInstance } from "./BookInstance";

export const BookInfoPage = () => {
  const {id_book} = useParams();
  if (id_book === undefined) <Navigate to = "/"/>
  const id : number = Number(id_book);
  const [bookForm, setBookForm] = useState<Book>({
    "id_book": Number(id_book),
    "book_name": "Loading",
    "authors":[],
  });


  useEffect(() => {
    console.log(id);
    getBookFormById(id).then(data => {
      setBookForm(data);
      console.log(data);
    });
  }, []);

  return (
    <div>
      <h1>{bookForm.book_name}</h1>
      <AllAuthors authors={bookForm.authors} />
      <BookInstance id_book={id}/>
    </div>
  )
}

