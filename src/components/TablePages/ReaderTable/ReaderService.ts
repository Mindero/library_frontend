import axios from "axios";
import { READER_ADD, READER_DELETE, READER_GET_ALL_URL, READER_UPDATE} from "../../../util/urls";
import { AppDispatch } from "../../../store";
import { setError, showModal, startLoading, stopLoading } from "../../../reducer/settingsStore";

export interface ReaderForm{
  name: string,
  email: string,
  phone_number: string,
  password: string,
  role: string,
}

export interface ReaderCreateUpdateForm{
  name: string,
  email: string,
  phone_number: string,
  role: string,
}

export interface Reader {
  reader_ticket: number;
  name: string;
  email: string;
  phone_number: string,
  role: string;
}

// Получение всех читателей
export const fetchAllReaders = async (jwt : string, dispatch: AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.get(`${READER_GET_ALL_URL}`, config);
    return res.data;
  }
  catch (error){
    dispatch(setError(`Error when fetch all readers ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
};

// Добавление нового читателя
export const addReader = async (jwt : string, form: ReaderForm, dispatch: AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.post(READER_ADD, form, config);
    return res.data;
  }
  catch(error){
    dispatch(setError(`Error when add reader ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
};

// Обновление читателя
export const updateReader = async (jwt : string, id_reader: number, form: ReaderForm, dispatch : AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.put(`${READER_UPDATE}${id_reader}`, form, config);
    return res.data;
  }
  catch(error){
    dispatch(setError(`Error when update reader ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
};

// Удаление читателя
export const deleteReader = async (jwt : string, id_reader: number, dispatch: AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.delete(`${READER_DELETE}${id_reader}`, config);
    return true;
  }
  catch(error){
    dispatch(setError(`Error when delete reader ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
};