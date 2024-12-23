import { useDispatch, useSelector } from "react-redux"
import { userJwtSelector } from "../../../reducer/userStore/reducer"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../Checker";
import { Role } from "../../../util/roles";
import { read } from "fs";
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";
import { addBookReader, BookReader, BookReaderForm, deleteBookReader, fetchAllBookReader, updateBookReader } from "./BookReaderService";

export const BookReaderTable = ({neededRole} :{neededRole: Role[]}) => {
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

  const defaultForm : BookReaderForm = { reader_ticket: 0, id_instance: 0, borrow_date: "", end_date: ""};
  const [book_readers, setAuthors] = useState<BookReader[]>([]);
  const [form, setForm] = useState<BookReaderForm>(defaultForm);
  const [selectedBookGenre, setSelectedAuthor] = useState<BookReader | null>(null);
  const [needToFetch, setToFetch] = useState<boolean>(true);
  
  useEffect(() => {
    if (!needToFetch) return;
    fetchAllBookReader(String(jwt), dispatch).then((data) => {
      if (data !== undefined){
        console.log(data);
        setAuthors(data);
        setToFetch(false);
      }
    });
  }, [needToFetch]);

  const del = (book_reader_id : number) => {
    deleteBookReader(String(jwt), book_reader_id, dispatch).then((data) => {
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
      updateBookReader(String(jwt), selectedBookGenre.id_book_reader, form, dispatch).then(data => {
        if (data !== undefined){
          setToFetch(true);
          setSelectedAuthor(null);
        }
      });
    }
  }

  const add = () => {
    addBookReader(String(jwt), form, dispatch).then(data => {
      if (data !== undefined) 
        setToFetch(true);
    });
  }

  return <div>
      <h1>Book Reader Management</h1>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            selectedBookGenre ? update() : add();
          }}
        >
          <label>
            reader ticket
          </label>
          <input
            type="number"
            placeholder="reader_ticket"
            value={form.reader_ticket}
            onChange={(e) => setForm({ ...form, reader_ticket: Number(e.target.value) })}
          />
          <label>
            id instance
          </label>
          <input
            type="number"
            placeholder="id instance"
            value={form.id_instance}
            onChange={(e) => setForm({ ...form, id_instance: Number(e.target.value) })}
          />
          <label>
            borrow date
          </label>
          <input
            type="Date"
            placeholder="borrow date"
            value={form.borrow_date}
            onChange={(e) => setForm({ ...form, borrow_date: e.target.value })}
          />
          <label>
            end date
          </label>
          <input
            type="Date"
            placeholder="end date"
            value={form.end_date}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
          />
          <button type="submit">{selectedBookGenre ? "Update" : "Add"}</button>
        </form>
      </div>

    {/* Таблица читателей */}
    <LoadingWrapper dispatch={dispatch}>
    <div>
      <h2>All book reader</h2>
      {book_readers.length === 0 ? (
        <p>No book reader found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Book name</th>
              <th>Publisher name</th>
              <th>id_reader</th>
              <th>id_instance</th>
              <th>borrow_date</th>
              <th>end_date</th>
            </tr>
          </thead>
          <tbody>
            {book_readers.map((book_reader) => (
              <tr key={book_reader.id_book_reader}>
                <td>{book_reader.id_book_reader}</td>
                <td>{book_reader.book_name}</td>
                <td>{book_reader.publisher_name}</td>
                <td>{book_reader.reader_ticket}</td>
                <td>{book_reader.id_instance}</td>
                <td>{book_reader.borrow_date}</td>
                <td>{book_reader.end_date}</td>
                <td>
                <button
                        style={{
                          backgroundColor:
                            selectedBookGenre?.id_book_reader === book_reader.id_book_reader
                              ? "lightblue"
                              : "white",
                        }}
                        onClick={() =>
                          (selectedBookGenre !== null && selectedBookGenre.id_book_reader === book_reader.id_book_reader)
                            ? setSelectedAuthor(null)
                            : setSelectedAuthor(book_reader)
                        }
                      >
                        Edit
                </button>
                  <button onClick={() => del(book_reader.id_book_reader)}>Delete</button>
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