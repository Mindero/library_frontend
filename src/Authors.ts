import axios, { AxiosResponse } from "axios";
import { setError, showModal, startLoading, stopLoading } from "./reducer/settingsStore";
import { AppDispatch } from "./store";
import { AUTHOR_GET_ALL, VIEW_BOOKS_GET_BY_AUTHOR_ID } from "./util/urls";
import { AuthorBook } from "./util/authorListToHtml";

export interface Author{
  id_author: number,
  name: string,
  count_books: number,
}

export const getAllAuthorBook = async (author_id:number, dispatch: AppDispatch) => {
  
  try{
    dispatch(startLoading());
    const res: AxiosResponse<AuthorBook[]> = await axios.get<AuthorBook[]>(`${VIEW_BOOKS_GET_BY_AUTHOR_ID}${author_id}`);
    const data = res.data;
    console.log("data ", data);
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

export const getAllAuthors = async (params: any, dispatch: AppDispatch) => {
  
  try{
    dispatch(startLoading());
    const res = await axios.get(`${AUTHOR_GET_ALL}`, {params});
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