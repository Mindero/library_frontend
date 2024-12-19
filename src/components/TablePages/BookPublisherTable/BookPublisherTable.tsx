import { useDispatch, useSelector } from "react-redux"
import { userJwtSelector } from "../../../reducer/userStore/reducer"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../Checker";
import { Role } from "../../../util/roles";
import { read } from "fs";
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";
import { addBookPublisher, BookPublisher, BookPublisherForm, deleteBookPublisher, fetchAllBookPublisher, updateBookPublisher } from "./BookPublisherService";

export const BookPublisherTable = ({neededRole} :{neededRole: Role[]}) => {
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

  const defaultForm : BookPublisherForm = { id_book: 0, id_publisher: 0};
  const [book_publishers, setAuthors] = useState<BookPublisher[]>([]);
  const [form, setForm] = useState<BookPublisherForm>(defaultForm);
  const [selectedBookGenre, setSelectedAuthor] = useState<BookPublisher | null>(null);
  const [needToFetch, setToFetch] = useState<boolean>(true);
  
  useEffect(() => {
    if (!needToFetch) return;
    fetchAllBookPublisher(String(jwt), dispatch).then((data) => {
      if (data !== undefined){
        console.log(data);
        setAuthors(data);
        setToFetch(false);
      }
    });
  }, [needToFetch]);

  const del = (book_publisher_id : number) => {
    deleteBookPublisher(String(jwt), book_publisher_id, dispatch).then((data) => {
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
      updateBookPublisher(String(jwt), selectedBookGenre.id_book_publisher, form, dispatch).then(data => {
        if (data !== undefined){
          setToFetch(true);
          setSelectedAuthor(null);
        }
      });
    }
  }

  const add = () => {
    addBookPublisher(String(jwt), form, dispatch).then(data => {
      if (data !== undefined) 
        setToFetch(true);
    });
  }

  return <div>
      <h1>Book Publisher Management</h1>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            selectedBookGenre ? update() : add();
          }}
        >
          <label>
            id Book
          </label>
          <input
            type="number"
            placeholder="id_book"
            value={form.id_book}
            onChange={(e) => setForm({ ...form, id_book: Number(e.target.value) })}
          />
          <label>
            id publisher
          </label>
          <input
            type="number"
            placeholder="id publisher"
            value={form.id_publisher}
            onChange={(e) => setForm({ ...form, id_publisher: Number(e.target.value) })}
          />
          <button type="submit">{selectedBookGenre ? "Update" : "Add"}</button>
        </form>
      </div>

    {/* Таблица читателей */}
    <LoadingWrapper dispatch={dispatch}>
    <div>
      <h2>All book publishers</h2>
      {book_publishers.length === 0 ? (
        <p>No book publishers found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Book name</th>
              <th>Publisher name</th>
              <th>id_book</th>
              <th>id_publisher</th>
            </tr>
          </thead>
          <tbody>
            {book_publishers.map((book_publisher) => (
              <tr key={book_publisher.id_book_publisher}>
                <td>{book_publisher.id_book_publisher}</td>
                <td>{book_publisher.book_name}</td>
                <td>{book_publisher.publisher}</td>
                <td>{book_publisher.id_book}</td>
                <td>{book_publisher.id_publisher}</td>
                <td>
                <button
                        style={{
                          backgroundColor:
                            selectedBookGenre?.id_book_publisher === book_publisher.id_book_publisher
                              ? "lightblue"
                              : "white",
                        }}
                        onClick={() =>
                          (selectedBookGenre !== null && selectedBookGenre.id_book_publisher === book_publisher.id_book_publisher)
                            ? setSelectedAuthor(null)
                            : setSelectedAuthor(book_publisher)
                        }
                      >
                        Edit
                </button>
                  <button onClick={() => del(book_publisher.id_book_publisher)}>Delete</button>
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