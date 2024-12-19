import { BOOK_READER_GET, READER_GET_PENALTY, READER_GET_URL } from "../../util/urls";
import axios from "axios";
import { useSelector } from "react-redux";
import { userJwtSelector } from "../../reducer/userStore/reducer";
import ProfileForm from "./ProfileForm";
import { ProfileInfo } from "../Header/ProfileInfo";
import { AppDispatch } from "../../store";
import { setError, showModal, startLoading, stopLoading } from "../../reducer/settingsStore";

export interface ProfileBook{
  id_book_reader: number,
  book_name : string,
  id_book: number
  id_instance: number,
  borrow_date: Date,
  end_date: Date,
}

export interface Penalty{
  id_book_reader: number,
  start_time: string,
  payment: number
}

export const getProfileInfo = async (jwt : string | null, dispatch : AppDispatch) => {
  // console.log("URL " + READER_GET_URL);
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.get(READER_GET_URL, config);
    return toProfileForm(res.data);
  }
  catch(error){
    dispatch(setError(`Error when get profile info ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
}
export const getProfilePenalty = async (jwt: string | null, dispatch : AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.get(`${READER_GET_PENALTY}`, config);
    return res.data;
  }
  catch(error){
    dispatch(setError(`Error when get profile info ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
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

export const getProfileBooks = async (jwt : string, dispatch : AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.get(`${BOOK_READER_GET}`, config);
    return res.data;
  }
  catch (error){
    dispatch(setError(`Error when get profile books ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
}