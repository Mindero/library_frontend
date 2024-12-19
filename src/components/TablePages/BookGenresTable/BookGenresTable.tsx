import { useDispatch, useSelector } from "react-redux"
import { userJwtSelector } from "../../../reducer/userStore/reducer"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../Checker";
import { Role } from "../../../util/roles";
import { read } from "fs";
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";
import { addBookGenre, BookGenre, BookGenreForm, deleteBookGenre, fetchAllBookGenre, updateBookGenre } from "./BookGenresService";

export const BookGenresTable = ({neededRole} :{neededRole: Role[]}) => {
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

  const defaultForm : BookGenreForm = { id_book: 0, id_genre: 0};
  const [book_genres, setAuthors] = useState<BookGenre[]>([]);
  const [form, setForm] = useState<BookGenreForm>(defaultForm);
  const [selectedBookGenre, setSelectedAuthor] = useState<BookGenre | null>(null);
  const [needToFetch, setToFetch] = useState<boolean>(true);
  
  useEffect(() => {
    if (!needToFetch) return;
    fetchAllBookGenre(String(jwt), dispatch).then((data) => {
      if (data !== undefined){
        console.log(data);
        setAuthors(data);
        setToFetch(false);
      }
    });
  }, [needToFetch]);

  const del = (book_genre_id : number) => {
    deleteBookGenre(String(jwt), book_genre_id, dispatch).then((data) => {
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
      updateBookGenre(String(jwt), selectedBookGenre.id_book_genres, form, dispatch).then(data => {
        if (data !== undefined){
          setToFetch(true);
          setSelectedAuthor(null);
        }
      });
    }
  }

  const add = () => {
    addBookGenre(String(jwt), form, dispatch).then(data => {
      if (data !== undefined) 
        setToFetch(true);
    });
  }

  return <div>
      <h1>Book Genre Management</h1>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            selectedBookGenre ? update() : add();
          }}
        >
          <input
            type="number"
            placeholder="id book"
            value={form.id_book}
            onChange={(e) => setForm({ ...form, id_book: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="id genre"
            value={form.id_genre}
            onChange={(e) => setForm({ ...form, id_genre: Number(e.target.value) })}
          />
          <button type="submit">{selectedBookGenre ? "Update" : "Add"}</button>
        </form>
      </div>

    {/* Таблица читателей */}
    <LoadingWrapper dispatch={dispatch}>
    <div>
      <h2>All book genres</h2>
      {book_genres.length === 0 ? (
        <p>No book genres found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Book name</th>
              <th>Id book</th>
              <th>Genre name</th>
              <th>Genre id</th>
            </tr>
          </thead>
          <tbody>
            {book_genres.map((book_genre) => (
              <tr key={book_genre.id_book_genres}>
                <td>{book_genre.id_book_genres}</td>
                <td>{book_genre.book_name}</td>
                <td>{book_genre.id_book}</td>
                <td>{book_genre.genre_name}</td>
                <td>{book_genre.id_genre}</td>
                <td>
                <button
                        style={{
                          backgroundColor:
                            selectedBookGenre?.id_book_genres === book_genre.id_book_genres
                              ? "lightblue"
                              : "white",
                        }}
                        onClick={() =>
                          (selectedBookGenre !== null && selectedBookGenre.id_book_genres === book_genre.id_book_genres)
                            ? setSelectedAuthor(null)
                            : setSelectedAuthor(book_genre)
                        }
                      >
                        Edit
                </button>
                  <button onClick={() => del(book_genre.id_book_genres)}>Delete</button>
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