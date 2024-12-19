import { useDispatch, useSelector } from "react-redux"
import { userJwtSelector } from "../../../reducer/userStore/reducer"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../Checker";
import { Role } from "../../../util/roles";
import { read } from "fs";
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";
import { addAuthor, Author, AuthorForm, deleteAuthor, fetchAllAuthors, updateAuthor } from "./AuthorsService";

export const AuthorsTable = ({neededRole} :{neededRole: Role[]}) => {
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

  const defaultForm : AuthorForm = { name: "", country: "", birthday: ""};
  const [authors, setAuthors] = useState<Author[]>([]);
  const [form, setForm] = useState<AuthorForm>(defaultForm);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [needToFetch, setToFetch] = useState<boolean>(true);
  
  useEffect(() => {
    if (!needToFetch) return;
    fetchAllAuthors(String(jwt), dispatch).then((data) => {
      if (data !== undefined){
        console.log(data);
        setAuthors(data);
        setToFetch(false);
      }
    });
  }, [needToFetch]);

  const del = (author_id : number) => {
    deleteAuthor(String(jwt), author_id, dispatch).then((data) => {
      if (data !== undefined)
        setToFetch(true);
    });
  }

  useEffect(() => {
    if (selectedAuthor === null){
      setForm(defaultForm);
    }
    else{
      setForm({...selectedAuthor});
    }
  }, [selectedAuthor]);

  const update = () => {
    if (selectedAuthor !== null){
      updateAuthor(String(jwt), selectedAuthor.id_author, form, dispatch).then(data => {
        if (data !== undefined){
          setToFetch(true);
          setSelectedAuthor(null);
        }
      });
    }
  }

  const add = () => {
    addAuthor(String(jwt), form, dispatch).then(data => {
      if (data !== undefined) 
        setToFetch(true);
    });
  }

  return <div>
      <h1>Authors Management</h1>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            selectedAuthor ? update() : add();
          }}
        >
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          />
          <input
            type="Date"
            placeholder="Date"
            value={form.birthday}
            onChange={(e) => setForm({ ...form, birthday: e.target.value })}
          />
          <button type="submit">{selectedAuthor ? "Update" : "Add"}</button>
        </form>
      </div>

    {/* Таблица читателей */}
    <LoadingWrapper dispatch={dispatch}>
    <div>
      <h2>All authors</h2>
      {authors.length === 0 ? (
        <p>No authors found</p>
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
            {authors.map((author) => (
              <tr key={author.id_author}>
                <td>{author.id_author}</td>
                <td>{author.name}</td>
                <td>{author.country}</td>
                <td>{author.birthday}</td>
                <td>
                <button
                        style={{
                          backgroundColor:
                            selectedAuthor?.id_author === author.id_author
                              ? "lightblue"
                              : "white",
                        }}
                        onClick={() =>
                          (selectedAuthor !== null && selectedAuthor.id_author === author.id_author)
                            ? setSelectedAuthor(null)
                            : setSelectedAuthor(author)
                        }
                      >
                        Edit
                </button>
                  <button onClick={() => del(author.id_author)}>Delete</button>
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