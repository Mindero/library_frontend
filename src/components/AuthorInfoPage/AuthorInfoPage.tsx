import { Navigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { AuthorForm, getAuthorBooksById, getAuthorById } from "./AuthorForm";
import { BookListToHtml } from "../../util/bookListToHtml";
import { useDispatch } from "react-redux";
import { LoadingWrapper } from "../LoadingWrapper/settingsLoading";

export const AuthorInfoPage = () => {
  const {id_author} = useParams();
  if (id_author === undefined) <Navigate to = "/"/>
  const number_id = Number(id_author);
  const [authorForm, setAuthorForm] = useState<AuthorForm>({
    "id_author": number_id,
    "author_name": "",
    "books":[],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getAuthorById(id_author, dispatch).then(author => 
      getAuthorBooksById(id_author, dispatch).then(books => {
        if (author !== undefined && books !== undefined){
          setAuthorForm({
            "id_author":number_id,
            "author_name": author.name,
            "books": books
          });
        }
    }));
  }, []);

  return (
    <div>
      <LoadingWrapper dispatch={dispatch}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#333',
          textAlign: 'left',
          paddingLeft: "15px"
        }}>{authorForm.author_name}</h1>
        <BookListToHtml booksList = {authorForm.books} showAuthors={false}/>
      </LoadingWrapper>
    </div>
  )
}

