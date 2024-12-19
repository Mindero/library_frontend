import { useDispatch, useSelector } from "react-redux"
import { userJwtSelector } from "../../../reducer/userStore/reducer"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../Checker";
import { Role } from "../../../util/roles";
import { read } from "fs";
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";
import { addBookInstance, BookInstance, BookInstanceForm, deleteBookInstance, fetchAllBookInstance, updateBookInstance } from "./BookInstanceService";

export const BookInstanceTable = ({neededRole} :{neededRole: Role[]}) => {
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

  const defaultForm : BookInstanceForm = { supply_date: "", taken_now: false, id_book_publisher: 0};
  const [book_instances, setAuthors] = useState<BookInstance[]>([]);
  const [form, setForm] = useState<BookInstanceForm>(defaultForm);
  const [selectedBookGenre, setSelectedAuthor] = useState<BookInstance | null>(null);
  const [needToFetch, setToFetch] = useState<boolean>(true);
  
  useEffect(() => {
    if (!needToFetch) return;
    fetchAllBookInstance(String(jwt), dispatch).then((data) => {
      if (data !== undefined){
        console.log(data);
        setAuthors(data);
        setToFetch(false);
      }
    });
  }, [needToFetch]);

  const del = (book_instance_id : number) => {
    deleteBookInstance(String(jwt), book_instance_id, dispatch).then((data) => {
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
      updateBookInstance(String(jwt), selectedBookGenre.id_instance, form, dispatch).then(data => {
        if (data !== undefined){
          setToFetch(true);
          setSelectedAuthor(null);
        }
      });
    }
  }

  const add = () => {
    addBookInstance(String(jwt), form, dispatch).then(data => {
      if (data !== undefined) 
        setToFetch(true);
    });
  }

  return <div>
      <h1>Book Instance Management</h1>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            selectedBookGenre ? update() : add();
          }}
        >
          <label>
            Supply date
          </label>
          <input
            type="date"
            placeholder="Supply date"
            value={form.supply_date}
            onChange={(e) => setForm({ ...form, supply_date: e.target.value })}
          />
          <label>
            taken now
          </label>
          <input
            type="checkbox"
            checked={form.taken_now}
            onChange={(e) => setForm({ ...form, taken_now: e.target.checked })}
          />
          <label>
            id book publisher
          </label>
          <input
            type="number"
            placeholder="id book publisher"
            value={form.id_book_publisher}
            onChange={(e) => setForm({ ...form, id_book_publisher: Number(e.target.value) })}
          />
          <button type="submit">{selectedBookGenre ? "Update" : "Add"}</button>
        </form>
      </div>

    {/* Таблица читателей */}
    <LoadingWrapper dispatch={dispatch}>
    <div>
      <h2>All book instances</h2>
      {book_instances.length === 0 ? (
        <p>No book instances found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Book name</th>
              <th>Publisher name</th>
              <th>id_book_publisher</th>
              <th>supply date</th>
              <th>taken now</th>
            </tr>
          </thead>
          <tbody>
            {book_instances.map((book_instance) => (
              <tr key={book_instance.id_instance}>
                <td>{book_instance.id_instance}</td>
                <td>{book_instance.book_name}</td>
                <td>{book_instance.publisher}</td>
                <td>{book_instance.id_book_publisher}</td>
                <td>{book_instance.supply_date}</td>
                <td>{book_instance.taken_now == false ? "false" : "true"}</td>
                <td>
                <button
                        style={{
                          backgroundColor:
                            selectedBookGenre?.id_instance === book_instance.id_instance
                              ? "lightblue"
                              : "white",
                        }}
                        onClick={() =>
                          (selectedBookGenre !== null && selectedBookGenre.id_instance === book_instance.id_instance)
                            ? setSelectedAuthor(null)
                            : setSelectedAuthor(book_instance)
                        }
                      >
                        Edit
                </button>
                  <button onClick={() => del(book_instance.id_instance)}>Delete</button>
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