import { Navigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { AuthorForm, getAuthorBooksById, getAuthorById } from "./AuthorForm";
import { BookListToHtml } from "../../bookListToHtml";
import { useDispatch } from "react-redux";
import { LoadingWrapper } from "../LoadingWrapper/settingsLoading";

export const AuthorInfoPage = () => {
  const {id_author} = useParams();
  if (id_author === undefined) <Navigate to = "/"/>

  const [authorForm, setAuthorForm] = useState<AuthorForm>({
    "author_name": "",
    "books":[],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getAuthorById(id_author, dispatch).then(author => 
      getAuthorBooksById(id_author, dispatch).then(books => {
        if (author !== undefined && books !== undefined){
          setAuthorForm({
            "author_name": author.name,
            "books": books
          });
        }
    }));
  }, []);

  return (
    <div>
      <LoadingWrapper dispatch={dispatch}>
        <h1>{authorForm.author_name}</h1>
        <BookListToHtml booksList = {authorForm.books}/>
      </LoadingWrapper>
    </div>
  )
}

