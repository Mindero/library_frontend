import axios from "axios";
import { BOOK_ADD, BOOK_DELETE, BOOK_GET_ALL, BOOK_UPDATE } from "../../../util/urls";
import { AppDispatch } from "../../../store";
import { setError, showModal, startLoading, stopLoading } from "../../../reducer/settingsStore";

export interface BookForm{
  name: string,
  year: number,
}

export interface Book {
  id_book: number
  name: string,
  year: number,
}

export const fetchAllBooks = async (jwt : string, dispatch: AppDispatch) : Promise<Book[] | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.get<Book[]>(`${BOOK_GET_ALL}`, config);
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

export const addBook = async (jwt : string, form: BookForm, dispatch: AppDispatch) : Promise<true | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.post(BOOK_ADD, form, config);
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

export const updateBook = async (jwt : string, id_boook: number, form: BookForm, dispatch : AppDispatch) : Promise<true | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.put(`${BOOK_UPDATE}${id_boook}`, form, config);
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

export const deleteBook = async (jwt : string, id_book: number, dispatch: AppDispatch) : Promise<true | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.delete(`${BOOK_DELETE}${id_book}`, config);
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