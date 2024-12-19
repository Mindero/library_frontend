import axios from "axios";
import { VIEW_BOOKS_GET_BY_AUTHOR_ID, AUTHOR_GET_BY_ID_URL } from "../../util/urls";
import { Book } from "../../Book";
import { AppDispatch } from "../../store";
import { setError, showModal, startLoading, stopLoading } from "../../reducer/settingsStore";

export interface AuthorForm{
  author_name: string,
  books: Book[],
}
export const getAuthorBooksById = async (id: string | undefined, dispatch : AppDispatch) => {
  try{
    dispatch(startLoading());
    const res = await axios.get(`${VIEW_BOOKS_GET_BY_AUTHOR_ID}${id}`);
    const data = res.data;
    return data;
  }
  catch (error){
    dispatch(setError(`Can't get author by id ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
}
export const getAuthorById = async (id: string | undefined, dispatch: AppDispatch) => {
  try{
    dispatch(startLoading());
    const res = await axios.get(`${AUTHOR_GET_BY_ID_URL}${id}`);
    const data = res.data; 
    return data;
  }
  catch(error){
    dispatch(setError(`Can't get author by id ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
}