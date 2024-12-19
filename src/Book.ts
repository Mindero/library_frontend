import axios from "axios";
import { GET_BOOK_BY_NAME_URL, VIEW_BOOKS_GET_ALL_URL, VIEW_BOOKS_GET_BY_NAME } from "./util/urls";
import { Author } from "./Authors";
import { AppDispatch } from "./store";
import { clearError, disableModal, setError, showModal, startLoading, stopLoading } from "./reducer/settingsStore";

export interface Book {
  book_name: string,
  id_book: number,
  authors: Author[],
}



export const getAllBooks = async (dispatch : AppDispatch) => {
  // console.log("URL " + VIEW_BOOKS_GET_ALL_URL);
  try{
    dispatch(startLoading());
    const res = await axios.get(VIEW_BOOKS_GET_ALL_URL);
    const data = res.data;
    return data;
  }
  catch(error){
    dispatch(showModal());
    dispatch(setError(`Error with get all books ${error}`));
  }
  finally{
    dispatch(stopLoading());
  }
}

export const getBooksByName = async (name : string, dispatch: AppDispatch) => {
  // console.log("URL " + VIEW_BOOKS_GET_BY_NAME);
  try{
    dispatch(startLoading());
    const res = await axios.get(VIEW_BOOKS_GET_BY_NAME + name);
    const data = res.data;
    return data;
  }
  catch (error){
    dispatch(showModal());
    dispatch(setError(`Error with view books get by name ${error}`));
  }
  finally{
    dispatch(stopLoading());
  }
}

export const getBookFormById = async (id : number, dispatch: AppDispatch) => {
  try{
    dispatch(startLoading());
    const res = await axios.get(GET_BOOK_BY_NAME_URL + id,);
    const data = res.data;
    return data;
  }
  catch (error){
    dispatch(showModal());
    dispatch(setError(`Can't get book by name ${error}`));
  }
  finally{
    dispatch(stopLoading());
  }
}