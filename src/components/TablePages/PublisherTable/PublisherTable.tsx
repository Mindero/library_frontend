import { useDispatch, useSelector } from "react-redux"
import { userJwtSelector } from "../../../reducer/userStore/reducer"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../Checker";
import { Role } from "../../../util/roles";
import { read } from "fs";
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";
import { fetchAllPublishers, Publisher, PublisherForm, addPublisher, deletePublisher, updatePublisher } from "./PublisherService";

export const PublishersTable = ({neededRole} :{neededRole: Role[]}) => {
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

  const defaultForm : PublisherForm = { name: "", inn: "", country: ''};
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [form, setForm] = useState<PublisherForm>(defaultForm);
  const [selectedPublisher, setSelectedPublisher] = useState<Publisher | null>(null);
  const [needToFetch, setToFetch] = useState<boolean>(true);
  
  useEffect(() => {
    if (!needToFetch) return;
    fetchAllPublishers(String(jwt), dispatch).then((data) => {
      if (data !== undefined){
        console.log(data);
        setPublishers(data);
        setToFetch(false);
      }
    });
  }, [needToFetch]);

  const del = (publisher_id : number) => {
    deletePublisher(String(jwt), publisher_id, dispatch).then((data) => {
      if (data !== undefined)
        setToFetch(true);
    });
  }

  useEffect(() => {
    if (selectedPublisher === null){
      setForm(defaultForm);
    }
    else{
      setForm({...selectedPublisher});
    }
  }, [selectedPublisher]);

  const update = () => {
    if (selectedPublisher !== null){
      updatePublisher(String(jwt), selectedPublisher.id_publisher, form, dispatch).then(data => {
        if (data !== undefined){
          setToFetch(true);
          setSelectedPublisher(null);
        }
      });
    }
  }

  const add = () => {
    addPublisher(String(jwt), form, dispatch).then(data => {
      if (data !== undefined) 
        setToFetch(true);
    });
  }

  return <div>
      <h1>Publishers Management</h1>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            selectedPublisher ? update() : add();
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
            inn
          </label>
          <input
            type="text"
            placeholder="inn"
            value={form.inn}
            onChange={(e) => setForm({ ...form, inn: e.target.value })}
          />
          <label>
            country
          </label>
          <input
            type="text"
            placeholder="country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          />
          <button type="submit">{selectedPublisher ? "Update" : "Add"}</button>
        </form>
      </div>

    {/* Таблица читателей */}
    <LoadingWrapper dispatch={dispatch}>
    <div>
      <h2>All publishers</h2>
      {publishers.length === 0 ? (
        <p>No publishers found</p>
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
            {publishers.map((publisher) => (
              <tr key={publisher.id_publisher}>
                <td>{publisher.id_publisher}</td>
                <td>{publisher.name}</td>
                <td>{publisher.inn}</td>
                <td>{publisher.country}</td>
                <td>
                <button
                        style={{
                          backgroundColor:
                            selectedPublisher?.id_publisher === publisher.id_publisher
                              ? "lightblue"
                              : "white",
                        }}
                        onClick={() =>
                          (selectedPublisher !== null && selectedPublisher.id_publisher === publisher.id_publisher)
                            ? setSelectedPublisher(null)
                            : setSelectedPublisher(publisher)
                        }
                      >
                        Edit
                </button>
                  <button onClick={() => del(publisher.id_publisher)}>Delete</button>
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