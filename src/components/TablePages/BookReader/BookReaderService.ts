import axios from "axios";
import { AppDispatch } from "../../../store";
import { setError, showModal, startLoading, stopLoading } from "../../../reducer/settingsStore";
import { BOOK_READER_CREATE, BOOK_READER_DELETE, BOOK_READER_GET_ALL, BOOK_READER_UPDATE } from "../../../util/urls";

export interface BookReaderForm{
  reader_ticket: number,
  id_instance: number,
  borrow_date: string,
  end_date: string,
}

export interface BookReader extends BookReaderForm {
  book_name: string,
  publisher_name: string,
  id_book_reader: number
}

export const fetchAllBookReader = async (jwt : string, dispatch: AppDispatch) : Promise<BookReader[] | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.get<BookReader[]>(`${BOOK_READER_GET_ALL}`, config);
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

export const addBookReader = async (jwt : string, form: BookReaderForm, dispatch: AppDispatch) : Promise<true | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.post(BOOK_READER_CREATE, form, config);
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

export const updateBookReader = async (jwt : string, id_instance: number, form: BookReaderForm, dispatch : AppDispatch
  ) : Promise<true | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.put(`${BOOK_READER_UPDATE}${id_instance}`, form, config);
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

export const deleteBookReader = async (jwt : string, id_instance: number, dispatch: AppDispatch) : Promise<true | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.delete(`${BOOK_READER_DELETE}${id_instance}`, config);
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