import { useDispatch, useSelector } from "react-redux"
import { userJwtSelector } from "../../../reducer/userStore/reducer"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../Checker";
import { Role } from "../../../util/roles";
import { read } from "fs";
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";
import { Book, BookForm, deleteBook, fetchAllBooks, updateBook, addBook } from "./BooksService";

export const BooksTable = ({neededRole} :{neededRole: Role[]}) => {
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

  const defaultForm : BookForm = { name: "", year: 0};
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState<BookForm>(defaultForm);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [needToFetch, setToFetch] = useState<boolean>(true);
  
  useEffect(() => {
    if (!needToFetch) return;
    fetchAllBooks(String(jwt), dispatch).then((data) => {
      if (data !== undefined){
        console.log(data);
        setBooks(data);
        setToFetch(false);
      }
    });
  }, [needToFetch]);

  const del = (book_id : number) => {
    deleteBook(String(jwt), book_id, dispatch).then((data) => {
      if (data !== undefined)
        setToFetch(true);
    });
  }

  useEffect(() => {
    if (selectedBook === null){
      setForm(defaultForm);
    }
    else{
      setForm({...selectedBook});
    }
  }, [selectedBook]);

  const update = () => {
    if (selectedBook !== null){
      updateBook(String(jwt), selectedBook.id_book, form, dispatch).then(data => {
        if (data !== undefined){
          setToFetch(true);
          setSelectedBook(null);
        }
      });
    }
  }

  const add = () => {
    addBook(String(jwt), form, dispatch).then(data => {
      if (data !== undefined) 
        setToFetch(true);
    });
  }

  return <div>
      <h1>Books Management</h1>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            selectedBook ? update() : add();
          }}
        >
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Year"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
          />
          <button type="submit">{selectedBook ? "Update" : "Add"}</button>
        </form>
      </div>

    {/* Таблица читателей */}
    <LoadingWrapper dispatch={dispatch}>
    <div>
      <h2>All books</h2>
      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Country</th>
              <th>Birthday</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id_book}>
                <td>{book.id_book}</td>
                <td>{book.name}</td>
                <td>{book.year}</td>
                <td>
                <button
                        style={{
                          backgroundColor:
                            selectedBook?.id_book === book.id_book
                              ? "lightblue"
                              : "white",
                        }}
                        onClick={() =>
                          (selectedBook !== null && selectedBook.id_book === book.id_book)
                            ? setSelectedBook(null)
                            : setSelectedBook(book)
                        }
                      >
                        Edit
                </button>
                  <button onClick={() => del(book.id_book)}>Delete</button>
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