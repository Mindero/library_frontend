import { useDispatch, useSelector } from "react-redux"
import { userJwtSelector } from "../../../reducer/userStore/reducer"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../Checker";
import { Role } from "../../../util/roles";
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";
import { addAuthorsBook, AuthorsBook, AuthorsBookForm, deleteAuthorsBook, fetchAllAuthorsBook, updateAuthorsBook } from "./AuthorsBookService";

export const AuthorsBookTable = ({neededRole} :{neededRole: Role[]}) => {
  const jwt : string | null = useSelector(userJwtSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt === null) {
      console.log("JWT is null, redirecting to home");
      navigate("/");
      return;
    }

    // Проверяем роль пользователя
    checkAdmin(jwt, dispatch)
      .then((data) => {
        if (data !== undefined){
          // console.log("User role:", data);
          const roleValue = Role[data as keyof typeof Role];
          if (!neededRole.includes(roleValue)) {
            // console.log("User role not allowed, redirecting to home");
            navigate("/");
          } else {
            // console.log("User role is allowed");
          }
        }
      });
  }, [jwt]);

  const defaultForm : AuthorsBookForm = { id_book: 0, id_author: 0};
  const [authorsBooks, setAuthors] = useState<AuthorsBook[]>([]);
  const [form, setForm] = useState<AuthorsBookForm>(defaultForm);
  const [selectedBookGenre, setSelectedAuthor] = useState<AuthorsBook | null>(null);
  const [needToFetch, setToFetch] = useState<boolean>(true);
  
  useEffect(() => {
    if (!needToFetch) return;
    fetchAllAuthorsBook(String(jwt), dispatch).then((data) => {
      if (data !== undefined){
        console.log(data);
        setAuthors(data);
        setToFetch(false);
      }
    });
  }, [needToFetch]);

  const del = (authorsBook_id : number) => {
    deleteAuthorsBook(String(jwt), authorsBook_id, dispatch).then((data) => {
      if (data !== undefined)
        setToFetch(true);
    });
  }

  useEffect(() => {
    if (selectedBookGenre === null){
      setForm(defaultForm);
    }
    else{
      setForm({...selectedBookGenre});
    }
  }, [selectedBookGenre]);

  const update = () => {
    if (selectedBookGenre !== null){
      updateAuthorsBook(String(jwt), selectedBookGenre.id_authors_book, form, dispatch).then(data => {
        if (data !== undefined){
          setToFetch(true);
          setSelectedAuthor(null);
        }
      });
    }
  }

  const add = () => {
    addAuthorsBook(String(jwt), form, dispatch).then(data => {
      if (data !== undefined) 
        setToFetch(true);
    });
  }

  return <div>
      <h1>Authors book management</h1>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            selectedBookGenre ? update() : add();
          }}
        >
          <label>
            id book:
          </label>
          <input
            type="number"
            placeholder="id book"
            value={form.id_book}
            onChange={(e) => setForm({ ...form, id_book: Number(e.target.value) })}
          />
          <label>
            id author:
          </label>
          <input
            type="number"
            placeholder="id author"
            value={form.id_author}
            onChange={(e) => setForm({ ...form, id_author: Number(e.target.value) })}
          />
          <button type="submit">{selectedBookGenre ? "Update" : "Add"}</button>
        </form>
      </div>

    {/* Таблица читателей */}
    <LoadingWrapper dispatch={dispatch}>
    <div>
      <h2>All authors book</h2>
      {authorsBooks.length === 0 ? (
        <p>No authors book found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>id book</th>
              <th>book name</th>
              <th>id author</th>
              <th>author name</th>
            </tr>
          </thead>
          <tbody>
            {authorsBooks.map((authorsBook) => (
              <tr key={authorsBook.id_authors_book}>
                <td>{authorsBook.id_authors_book}</td>
                <td>{authorsBook.id_book}</td>
                <td>{authorsBook.book_name}</td>
                <td>{authorsBook.id_author}</td>
                <td>{authorsBook.author_name}</td>
                <td>
                <button
                        style={{
                          backgroundColor:
                            selectedBookGenre?.id_authors_book === authorsBook.id_authors_book
                              ? "lightblue"
                              : "white",
                        }}
                        onClick={() =>
                          (selectedBookGenre !== null && selectedBookGenre.id_authors_book === authorsBook.id_authors_book)
                            ? setSelectedAuthor(null)
                            : setSelectedAuthor(authorsBook)
                        }
                      >
                        Edit
                </button>
                  <button onClick={() => del(authorsBook.id_authors_book)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </LoadingWrapper>
  </div>;
}