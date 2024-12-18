import { Navigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { AuthorForm, getAuthorBooksById, getAuthorById } from "./AuthorForm";
import { BookListToHtml } from "../../bookListToHtml";

export const AuthorInfoPage = () => {
  const {id_author} = useParams();
  if (id_author === undefined) <Navigate to = "/"/>

  const [authorForm, setAuthorForm] = useState<AuthorForm>({
    "author_name": "Loading",
    "books":[],
  });


  useEffect(() => {
    getAuthorById(id_author).then(author => 
      getAuthorBooksById(id_author).then(books => {
        setAuthorForm({
          "author_name": author.name,
          "books": books
        });
    }));
  }, []);

  return (
    <div>
      <h1>{authorForm.author_name}</h1>
      <BookListToHtml booksList = {authorForm.books}/>
    </div>
  )
}

