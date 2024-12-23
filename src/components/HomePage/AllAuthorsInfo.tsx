import { useEffect, useState } from "react";
import { Book, getAllBooks } from "../../Book";
import { BookListToHtml } from "../../bookListToHtml";
import { useDispatch } from "react-redux";
import { LoadingWrapper } from "../LoadingWrapper/settingsLoading";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { AuthorForm, getAllAuthorsId, getAuthorBooksById, getAuthorById } from "../AuthorInfoPage/AuthorForm";
import { startLoading, stopLoading } from "../../reducer/settingsStore";
import { useNavigate } from "react-router-dom";

export const AllAuthorsInfo = () => {
  const [authorList, setAuthorList] = useState<AuthorForm[]>([]);
  const [authorsListHtml, setAuthorsListHtml] = useState<JSX.Element[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authors = await getAllAuthorsId(dispatch);
        if (Array.isArray(authors) && authors.length > 0) {
          for (const author of authors) {
            const id_author = author.id_author;
            const authorData = await getAuthorById(String(id_author), dispatch);
            const books = await getAuthorBooksById(String(id_author), dispatch);
            
            if (authorData && books) {
              const newAuthor = {
                id_author: id_author,
                author_name: authorData.name,
                books: books,
              };
              
              setAuthorList(prev => [...prev, newAuthor]);
              setAuthorsListHtml(prev => [...prev, getAuthorListHtml(newAuthor)]);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, [dispatch]);

  const clickHander = (to: string) => {
    navigate(to);
  }
  const getAuthorListHtml = (author: AuthorForm): JSX.Element => {
    return (
      <div key={author.id_author}>
        <button type="button" onClick = {() => clickHander(`/author/${author.id_author}`)} style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#333',
          textAlign: 'left',
          paddingLeft: "15px"
        }}>{author.author_name}</button>
        <BookListToHtml booksList={author.books}  showAuthors={false}/>
      </div>
    );
  };

  return (
    <div>
      <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#333',
          textAlign: 'left',
          paddingLeft: "15px"
        }}>Все авторы</h1>
      <LoadingWrapper dispatch={dispatch}>
        <div>
          {authorsListHtml.length > 0 ? authorsListHtml : <p>Нет авторов для отображения.</p>}
        </div>
      </LoadingWrapper>
    </div>
  );
};