import { useDispatch, useSelector } from "react-redux"
import { userJwtSelector } from "../../../reducer/userStore/reducer"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkAdmin } from "../Checker";
import { Role } from "../../../util/roles";
import { LoadingWrapper } from "../../LoadingWrapper/settingsLoading";
import { getAllPenalties, Penalty } from "./PenaltyViewService";
import { PenaltyListToHtml } from "./PenaltyListToHtml";
import { PenaltyViewFilter } from "./PenaltyViewFilter";

export const PenaltyView = ({neededRole} :{neededRole: Role[]}) => {
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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(queryParams.entries());
  const { reader_name, reader_email, reader_ticket} = params;
  const [penaltyList, setPenaltyList] = useState<Penalty[]>([]);
  // Для передачи фильтров в BookFilterForm
  const filter = {
    reader_name: reader_name, 
    reader_email: reader_email,
    reader_ticket: reader_ticket,
  };

  

  useEffect(() => {
    setPenaltyList([]);
    const params : any = {};
    if (reader_name) params.reader_name = reader_name;
    if (reader_email) params.reader_email = reader_email;
    if (reader_ticket) params.reader_ticket = reader_ticket;

    getAllPenalties(params, jwt as string, dispatch).then((data) => {
      console.log('allPenalty', data);
      if (data !== undefined)
        setPenaltyList(data);
    })
  }, [reader_name, reader_email, reader_ticket]);

  return (
    <LoadingWrapper dispatch={dispatch}>
      <div className="search-page">
        {/* Панель фильтров */}
        <div className="filters">
          <PenaltyViewFilter filter={filter}/>
        </div>
        <div className="outter-book-list-container">
          <PenaltyListToHtml penalties={penaltyList}/>
        </div>
      </div>
    </LoadingWrapper>
  )
}