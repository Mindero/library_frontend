import { BOOK_READER_GET, READER_GET_PENALTY, READER_GET_URL } from "../../util/urls";
import axios, { AxiosResponse } from "axios";
import ProfileForm from "./ProfileForm";
import { AppDispatch } from "../../store";
import { setError, showModal, startLoading, stopLoading } from "../../reducer/settingsStore";

export interface ProfileBook {
  id_book_reader: number,
  book_name : string,
  id_book: number
  id_instance: number,
  borrow_date: Date,
  end_date: Date,
}

export interface Penalty {
  id_book_reader: number,
  start_time: string,
  payment: number
}

export const getProfileInfo = async (jwt : string, dispatch : AppDispatch) : Promise<ProfileForm | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  dispatch(startLoading());
  return await axios.get<ProfileForm>(READER_GET_URL, config)
    .then((res : AxiosResponse<ProfileForm>) => toProfileForm(res.data))
    .catch(function (error) {
      console.log(error);
      dispatch(setError(`${error.response?.status || 500}. Ошибка при получении информации о профиле.`));
      dispatch(showModal());
    })
    .finally(() => dispatch(stopLoading()));
}
export const getProfilePenalty = async (jwt: string, dispatch : AppDispatch) : Promise<Penalty[] | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  dispatch(startLoading());
  return await axios.get<Penalty[]>(`${READER_GET_PENALTY}`, config)
    .then((res : AxiosResponse<Penalty[]>) => res.data)
    .catch(function (error) {
      console.log(error);
      dispatch(setError(`${error.response?.status || 500}. Ошибка при получении задолжностей профиля.`));
      dispatch(showModal());
    })
    .finally(() => dispatch(stopLoading()));
}

const toProfileForm = (data : any) : ProfileForm => {
  const res : ProfileForm = 
  { 
    name: data.name, 
    email: data.email, 
    phone_number: data.phone_number, 
    created_date: data.created_date,
    sum_payment: data.sum_payment,
    cnt_payment: data.cnt_payment
  };
  return res;
}

export const getProfileBooks = async (jwt : string, dispatch : AppDispatch) : Promise<ProfileBook[] | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  dispatch(startLoading());
  return await axios.get<ProfileBook[]>(`${BOOK_READER_GET}`, config)
    .then((res : AxiosResponse<ProfileBook[]>) => res.data)
    .catch(function (error) {
      console.log(error);
      dispatch(setError(`${error.response?.status || 500}. Ошибка при получении взятых книг профиля.`));
      dispatch(showModal());
    })
    .finally(() => dispatch(stopLoading()));
}