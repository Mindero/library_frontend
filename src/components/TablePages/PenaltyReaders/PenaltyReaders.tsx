import { useDispatch, useSelector } from "react-redux"
import { userJwtSelector } from "../../../reducer/userStore/reducer"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../Checker";
import { Role } from "../../../util/roles";
import { read } from "fs";
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";
import { getAllPenaltyReaders, PenaltyReader } from "./PenaltyReaderService";

export const PenaltyReadersTable = ({neededRole} :{neededRole: Role[]}) => {
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

  const [penaltyReaders, setPenaltyReaders] = useState<PenaltyReader[]>([]);
  const [needToFetch, setToFetch] = useState<boolean>(true);

  useEffect(() => {
    if (!needToFetch) return;
    getAllPenaltyReaders(String(jwt), dispatch).then((data) => {
      if (data !== undefined){
        console.log(data);
        setPenaltyReaders(data);
        setToFetch(false);
      }
    });
  }, [needToFetch]);

  return <div>
      <h1>Все должники</h1>

      <LoadingWrapper dispatch={dispatch}>
      <div>
      {penaltyReaders.length === 0 ? (
        <p>Должников нет!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Телефон</th>
              <th>Почта</th>
              <th>Сумма долга</th>
              <th>Кол-во задолженных книг</th>
            </tr>
          </thead>
          <tbody>
            {penaltyReaders.map((penalty) => (
              <tr key={penalty.reader_ticket}>
                <td>{penalty.reader_ticket}</td>
                <td>{penalty.name}</td>
                <td>{penalty.phone_number}</td>
                <td>{penalty.email}</td>
                <td>{penalty.sum_payment}</td>
                <td>{penalty.cnt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </LoadingWrapper>
  </div>;
}