import { useSelector } from "react-redux"
import { userJwtSelector } from "../../../reducer/userStore/reducer"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../Checker";
import { Role } from "../../../util/roles";
import { addReader, deleteReader, fetchAllReaders, Reader, ReaderForm, updateReader } from "./ReaderService";
import { read } from "fs";

export const ReadersTable = ({neededRole} :{neededRole: Role[]}) => {
  const jwt : string | null = useSelector(userJwtSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt === null) {
      console.log("JWT is null, redirecting to home");
      navigate("/");
      return;
    }

    // Проверяем роль пользователя
    checkAdmin(jwt)
      .then((data) => {
        // console.log("User role:", data);
        const roleValue = Role[data as keyof typeof Role];
        if (!neededRole.includes(roleValue)) {
          // console.log("User role not allowed, redirecting to home");
          navigate("/");
        } else {
          // console.log("User role is allowed");
        }
      })
      .catch((error) => {
        console.log("Error while checking admin role:", error);
        navigate("/");
      });
  }, [jwt]);

  const [readers, setReaders] = useState<Reader[]>([]);
  const [form, setForm] = useState<ReaderForm>({ name: "", email: "", phone_number: "", password: "", role: "USER" });
  const [selectedReader, setSelectedReader] = useState<Reader | null>(null);
  const [needToFetch, setToFetch] = useState<boolean>(true);
  
  useEffect(() => {
    if (!needToFetch) return;
    fetchAllReaders(String(jwt)).then((data) => {
      setReaders(data);
      setToFetch(false);
    }).catch((error) => {
      console.log("Error when get all readers " + error);
      navigate("/");
    });
  }, [needToFetch]);

  const del = (reader_id : number) => {
    deleteReader(String(jwt), reader_id).then((data) => {
      setToFetch(true);
    }).catch((error) => {
      console.log("Error when delete reader " + error);
    });
  }

  const update = () => {
    if (selectedReader !== null){
      updateReader(String(jwt), selectedReader.reader_ticket, form).then(data => {
        setToFetch(true);
        setSelectedReader(null);
      }).catch((error) => {
        console.log("Error when update reader " + error);
      });
    }
  }

  const add = () => {
    addReader(String(jwt), form).then(data => {
      setToFetch(true);
    }).catch((error) => {
      console.log("Error when add reader " + error);
    });
  }

  return <div>
    <h1>Readers Management</h1>

    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          selectedReader ? update() : add();
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          type="text"
          placeholder="phone number"
          value={form.phone_number}
          onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit">{selectedReader ? "Update" : "Add"}</button>
      </form>
    </div>

  {/* Таблица читателей */}
  <div>
    <h2>All Readers</h2>
    {readers.length === 0 ? (
      <p>No readers found</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {readers.map((reader) => (
            <tr key={reader.reader_ticket}>
              <td>{reader.reader_ticket}</td>
              <td>{reader.name}</td>
              <td>{reader.email}</td>
              <td>{reader.role}</td>
              <td>{reader.phone_number}</td>
              <td>
                <button onClick={() => (selectedReader === reader)? (setSelectedReader(null)) : (setSelectedReader(reader))}>Edit</button>
                <button onClick={() => del(reader.reader_ticket)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  </div>;
}