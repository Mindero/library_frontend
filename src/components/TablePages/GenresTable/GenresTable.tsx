import { useDispatch, useSelector } from "react-redux"
import { userJwtSelector } from "../../../reducer/userStore/reducer"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../Checker";
import { Role } from "../../../util/roles";
import { read } from "fs";
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";
import { GenreForm, Genre, addGenre, fetchAllGenres, deleteGenre, updateGenre } from "./GenresService";

export const GenresTable = ({neededRole} :{neededRole: Role[]}) => {
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

  const defaultForm : GenreForm = { name: "", url:""};
  const [genres, setGenres] = useState<Genre[]>([]);
  const [form, setForm] = useState<GenreForm>(defaultForm);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [needToFetch, setToFetch] = useState<boolean>(true);
  
  useEffect(() => {
    if (!needToFetch) return;
    fetchAllGenres(String(jwt), dispatch).then((data) => {
      if (data !== undefined){
        console.log(data);
        setGenres(data);
        setToFetch(false);
      }
    });
  }, [needToFetch]);

  const del = (genre_id : number) => {
    deleteGenre(String(jwt), genre_id, dispatch).then((data) => {
      if (data !== undefined)
        setToFetch(true);
    });
  }

  useEffect(() => {
    if (selectedGenre === null){
      setForm(defaultForm);
    }
    else{
      setForm({...selectedGenre});
    }
  }, [selectedGenre]);

  const update = () => {
    if (selectedGenre !== null){
      updateGenre(String(jwt), selectedGenre.id_genre, form, dispatch).then(data => {
        if (data !== undefined){
          setToFetch(true);
          setSelectedGenre(null);
        }
      });
    }
  }

  const add = () => {
    addGenre(String(jwt), form, dispatch).then(data => {
      if (data !== undefined) 
        setToFetch(true);
    });
  }

  return <div>
      <h1>Genres Management</h1>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            selectedGenre ? update() : add();
          }}
        >
          <label>
            name
          </label>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <label>
            url
          </label>
          <input
            type="text"
            placeholder="Name"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
          <button type="submit">{selectedGenre ? "Update" : "Add"}</button>
        </form>
      </div>

    {/* Таблица читателей */}
    <LoadingWrapper dispatch={dispatch}>
    <div>
      <h2>All genres</h2>
      {genres.length === 0 ? (
        <p>No genres found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>url</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre) => (
              <tr key={genre.id_genre}>
                <td>{genre.id_genre}</td>
                <td>{genre.name}</td>
                <td>{genre.url}</td>
                <td>
                <button
                        style={{
                          backgroundColor:
                            selectedGenre?.id_genre === genre.id_genre
                              ? "lightblue"
                              : "white",
                        }}
                        onClick={() =>
                          (selectedGenre !== null && selectedGenre.id_genre === genre.id_genre)
                            ? setSelectedGenre(null)
                            : setSelectedGenre(genre)
                        }
                      >
                        Edit
                </button>
                  <button onClick={() => del(genre.id_genre)}>Delete</button>
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