import { useDispatch, useSelector } from "react-redux"
import { userJwtSelector } from "../../../reducer/userStore/reducer"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../Checker";
import { Role } from "../../../util/roles";
import { read } from "fs";
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";
import { addPenalty, deletePenalty, fetchAllPenalty, Penalty, PenaltyForm, updatePenalty } from "./PenaltyService";

export const PenaltyTable = ({neededRole} :{neededRole: Role[]}) => {
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

  const defaultForm : PenaltyForm = { id_book_reader: 0, start_time: "", payment: 0};
  const [penaltys, setAuthors] = useState<Penalty[]>([]);
  const [form, setForm] = useState<PenaltyForm>(defaultForm);
  const [selectedBookGenre, setSelectedAuthor] = useState<Penalty | null>(null);
  const [needToFetch, setToFetch] = useState<boolean>(true);
  
  useEffect(() => {
    if (!needToFetch) return;
    fetchAllPenalty(String(jwt), dispatch).then((data) => {
      if (data !== undefined){
        console.log(data);
        setAuthors(data);
        setToFetch(false);
      }
    });
  }, [needToFetch]);

  const del = (penalty_id : number) => {
    deletePenalty(String(jwt), penalty_id, dispatch).then((data) => {
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
      updatePenalty(String(jwt), selectedBookGenre.id_book_reader, form, dispatch).then(data => {
        if (data !== undefined){
          setToFetch(true);
          setSelectedAuthor(null);
        }
      });
    }
  }

  const add = () => {
    addPenalty(String(jwt), form, dispatch).then(data => {
      if (data !== undefined) 
        setToFetch(true);
    });
  }

  return <div>
      <h1>Penalty management</h1>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            selectedBookGenre ? update() : add();
          }}
        >
          <input
            type="number"
            placeholder="id book reader"
            value={form.id_book_reader}
            onChange={(e) => setForm({ ...form, id_book_reader: Number(e.target.value) })}
          />
            <input
              type="Date"
              placeholder="start time"
              value={form.start_time}
              onChange={(e) => setForm({ ...form, start_time: e.target.value })}
            />
          <input
            type="number"
            placeholder="payment"
            value={form.payment}
            onChange={(e) => setForm({ ...form, payment: Number(e.target.value) })}
          />
          <button type="submit">{selectedBookGenre ? "Update" : "Add"}</button>
        </form>
      </div>

    {/* Таблица читателей */}
    <LoadingWrapper dispatch={dispatch}>
    <div>
      <h2>All penalty</h2>
      {penaltys.length === 0 ? (
        <p>No penalty found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>start time</th>
              <th>payment</th>
            </tr>
          </thead>
          <tbody>
            {penaltys.map((penalty) => (
              <tr key={penalty.id_book_reader}>
                <td>{penalty.id_book_reader}</td>
                <td>{penalty.start_time}</td>
                <td>{penalty.payment}</td>
                <td>
                <button
                        style={{
                          backgroundColor:
                            selectedBookGenre?.id_book_reader === penalty.id_book_reader
                              ? "lightblue"
                              : "white",
                        }}
                        onClick={() =>
                          (selectedBookGenre !== null && selectedBookGenre.id_book_reader === penalty.id_book_reader)
                            ? setSelectedAuthor(null)
                            : setSelectedAuthor(penalty)
                        }
                      >
                        Edit
                </button>
                  <button onClick={() => del(penalty.id_book_reader)}>Delete</button>
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