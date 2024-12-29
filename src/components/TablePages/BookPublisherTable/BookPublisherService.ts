import axios from "axios";
import { BOOK_PUBLISHER_ADD, BOOK_PUBLISHER_DELETE, BOOK_PUBLISHER_GET_ALL, BOOK_PUBLISHER_UPDATE, INSTANCE_ADD, INSTANCE_DELETE, INSTANCE_GET_ALL, INSTANCE_UPDATE } from "../../../util/urls";
import { AppDispatch } from "../../../store";
import { setError, showModal, startLoading, stopLoading } from "../../../reducer/settingsStore";

export interface BookPublisherForm{
  id_book: number,
  id_publisher: number,
}

export interface BookPublisher extends BookPublisherForm {
  book_name: string,
  publisher: string,
  id_book_publisher: number
}

export const fetchAllBookPublisher = async (jwt : string, dispatch: AppDispatch) : Promise<BookPublisher[] | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.get<BookPublisher[]>(`${BOOK_PUBLISHER_GET_ALL}`, config);
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

export const addBookPublisher = async (jwt : string, form: BookPublisherForm, dispatch: AppDispatch) : Promise<true | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.post(BOOK_PUBLISHER_ADD, form, config);
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

export const updateBookPublisher = async (jwt : string, id_instance: number, form: BookPublisherForm, dispatch : AppDispatch
  ) : Promise<true | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.put(`${BOOK_PUBLISHER_UPDATE}${id_instance}`, form, config);
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

export const deleteBookPublisher = async (jwt : string, id_instance: number, dispatch: AppDispatch) : Promise<true | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.delete(`${BOOK_PUBLISHER_DELETE}${id_instance}`, config);
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