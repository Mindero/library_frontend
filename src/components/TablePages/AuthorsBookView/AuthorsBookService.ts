import axios from "axios";
import { AppDispatch } from "../../../store";
import { setError, showModal, startLoading, stopLoading } from "../../../reducer/settingsStore";
import { AUTHORS_BOOK_ADD, AUTHORS_BOOK_DELETE, AUTHORS_BOOK_GET_ALL, AUTHORS_BOOK_UPDATE } from "../../../util/urls";

export interface AuthorsBookForm{
  id_book: number,
  id_author: number
}

export interface AuthorsBook {
  id_authors_book: number
  id_book: number,
  book_name: string,
  id_author: number,
  author_name: string
}

export const fetchAllAuthorsBook = async (jwt : string, dispatch: AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.get(`${AUTHORS_BOOK_GET_ALL}`, config);
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

export const addAuthorsBook = async (jwt : string, form: AuthorsBookForm, dispatch: AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.post(AUTHORS_BOOK_ADD, form, config);
    return res.data;
  }
  catch(error){
    dispatch(setError(`Error when add author ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
};

export const updateAuthorsBook = async (jwt : string, id_instance: number, form: AuthorsBookForm, dispatch : AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.put(`${AUTHORS_BOOK_UPDATE}${id_instance}`, form, config);
    return res.data;
  }
  catch(error){
    dispatch(setError(`Error when update author ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
};

export const deleteAuthorsBook = async (jwt : string, id_instance: number, dispatch: AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.delete(`${AUTHORS_BOOK_DELETE}${id_instance}`, config);
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