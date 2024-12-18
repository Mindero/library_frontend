import { Navigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { AllAuthors } from "../../AllAuthors";
import { Book, getBookFormById } from "../../Book";

export const BookInfoPage = () => {
  const {id_book} = useParams();
  console.log("BookInfoPage " + id_book);
  if (id_book === undefined) <Navigate to = "/"/>

  const [bookForm, setBookForm] = useState<Book>({
    "id_book": Number(id_book),
    "book_name": "Loading",
    "authors":[],
  });


  useEffect(() => {
    console.log(id_book);
    getBookFormById(id_book).then(data => {
      setBookForm(data);
      console.log(data);
    });
  }, []);

  return (
    <div>
      <h1>{bookForm.book_name}</h1>
      <AllAuthors authors={bookForm.authors} />
    </div>
  )
}

