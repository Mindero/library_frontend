import { READER_LOGIN_URL } from "../../util/urls";
import axios from "axios";
import LoginForm from "./LoginForm";
import { AppDispatch } from "../../store";
import { setError, showModal, startLoading, stopLoading } from "../../reducer/settingsStore";

export const postLoginForm = async (loginForm: LoginForm, dispatch : AppDispatch) => {
  const form_data : FormData = new FormData()

  form_data.append("username", loginForm.username)
  form_data.append("password", loginForm.password)
  console.log("URL " + READER_LOGIN_URL);
  try{
    dispatch(startLoading());
    const res = await axios.post(READER_LOGIN_URL, form_data);
    return res.data;
  }
  catch(error){
    dispatch(setError(`Error when login ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
}