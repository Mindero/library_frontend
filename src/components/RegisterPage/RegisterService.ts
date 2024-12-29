import { setError, showModal, startLoading, stopLoading } from "../../reducer/settingsStore";
import { AppDispatch } from "../../store";
import { READER_REGISTER_URL } from "../../util/urls";
import RegisterForm from "./RegisterForm";
import axios, { AxiosResponse } from "axios";

export const postRegisterForm = async (registerForm: RegisterForm, dispatch : AppDispatch) : Promise<void> => {
  dispatch(startLoading());
  return await axios.post<void>(READER_REGISTER_URL, registerForm)
    .then((res : AxiosResponse<void>) => res.data)
    .catch(function (error) {
      console.log(error);
      dispatch(setError(`${error.response?.status || 500}. Ошибка при регистрации.`));
      dispatch(showModal());
    })
    .finally(() => dispatch(stopLoading()));
}