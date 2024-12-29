import { READER_LOGIN_URL } from "../../util/urls";
import axios, { AxiosResponse } from "axios";
import LoginForm from "./LoginForm";
import { AppDispatch } from "../../store";
import { setError, showModal, startLoading, stopLoading } from "../../reducer/settingsStore";

export interface LoginResponse {
  access_token: string,
  role: string,
  token_type: string 
}

export const postLoginForm = async (loginForm: LoginForm, dispatch : AppDispatch) : Promise<LoginResponse | void> => {
  const form_data : FormData = new FormData()

  form_data.append("username", loginForm.username)
  form_data.append("password", loginForm.password)
  dispatch(startLoading());
  return await axios.post<LoginResponse>(READER_LOGIN_URL, form_data)
    .then((res : AxiosResponse<LoginResponse>) => res.data)
    .catch(function (error) {
      console.log(error);
      dispatch(setError(`${error.response?.status || 500}. Ошибка при логине.`));
      dispatch(showModal());
    })
    .finally(() => dispatch(stopLoading()));
}