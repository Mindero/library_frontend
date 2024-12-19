import { setError, showModal, startLoading, stopLoading } from "../../reducer/settingsStore";
import { AppDispatch } from "../../store";
import { READER_REGISTER_URL } from "../../util/urls";
import RegisterForm from "./RegisterForm";
import axios from "axios";

export const postRegisterForm = async (registerForm: RegisterForm, dispatch : AppDispatch) => {
  try{
    dispatch(startLoading());
    console.log("URL " + READER_REGISTER_URL);
    const res = await axios.post(READER_REGISTER_URL, registerForm);
    return res.data;
  }
  catch(error){
    dispatch(setError(`Register error ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
}