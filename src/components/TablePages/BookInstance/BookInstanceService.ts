import axios from "axios";
import { INSTANCE_ADD, INSTANCE_DELETE, INSTANCE_GET_ALL, INSTANCE_UPDATE } from "../../../util/urls";
import { AppDispatch } from "../../../store";
import { setError, showModal, startLoading, stopLoading } from "../../../reducer/settingsStore";

export interface BookInstanceForm{
  supply_date: string,
  taken_now: boolean,
  id_book_publisher: number
}

export interface BookInstance extends BookInstanceForm {
  book_name: string,
  publisher: string,
  id_instance: number
}

export const fetchAllBookInstance = async (jwt : string, dispatch: AppDispatch) : Promise<BookInstance[] | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.get<BookInstance[]>(`${INSTANCE_GET_ALL}`, config);
    return res.data;
  }
  catch (error){
    dispatch(setError(`Error when fetch all authors ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
};

export const addBookInstance = async (jwt : string, form: BookInstanceForm, dispatch: AppDispatch) : Promise<true | void>=> {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.post(INSTANCE_ADD, form, config);
    return true;
  }
  catch(error){
    dispatch(setError(`Error when add author ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
};

export const updateBookInstance = async (jwt : string, id_instance: number, form: BookInstanceForm, dispatch : AppDispatch
  ) : Promise<true | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
  await axios.put(`${INSTANCE_UPDATE}${id_instance}`, form, config);
    return true;
  }
  catch(error){
    dispatch(setError(`Error when update author ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
};

export const deleteBookInstance = async (jwt : string, id_instance: number, dispatch: AppDispatch) : Promise<true | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.delete(`${INSTANCE_DELETE}${id_instance}`, config);
    return true;
  }
  catch(error){
    dispatch(setError(`Error when delete author ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
};