import { READER_GET_URL } from "../../util/urls";
import axios from "axios";
import { useSelector } from "react-redux";
import { userJwtSelector } from "../../reducer/userStore/reducer";
import ProfileForm from "./ProfileForm";
import { ProfileInfo } from "../Header/ProfileInfo";

export const getProfileInfo = async (jwt : string | null) => {
  console.log("URL " + READER_GET_URL);
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  const res = await axios.get(READER_GET_URL, config);
  // console.log(res);
  return toProfileForm(res.data);
}

const toProfileForm = (data : any) : ProfileForm => {
  const res : ProfileForm = 
  { name: data.name, 
    email: data.email, 
    phone_number: data.phone_number, 
    created_date: data.created_date,
  };
  return res;
}