import axios, { AxiosResponse } from "axios";
import { setError, showModal, startLoading, stopLoading } from "./reducer/settingsStore";
import { AppDispatch } from "./store";
import { AUTHOR_GET_ALL, AUTHOR_GET_ALL_COUNTRIES, VIEW_BOOKS_GET_BY_AUTHOR_ID } from "./util/urls";
import { AuthorBook } from "./util/authorListToHtml";

export interface Author{
  id_author: number,
  name: string,
  count_books: number,
}

export const getAllAuthorBook = async (author_id:number, dispatch: AppDispatch) : Promise<AuthorBook[] | void>=> {
  dispatch(startLoading());
  return await axios.get<AuthorBook[]>(`${VIEW_BOOKS_GET_BY_AUTHOR_ID}${author_id}`)
    .then((res : AxiosResponse<AuthorBook[]>) => res.data)
    .catch(function (error) {
      console.log(error);
      dispatch(setError(`${error.response?.status || 500}. Ошибка при получении всех книг автора.`));
      dispatch(showModal());
    })
    .finally(() => dispatch(stopLoading()));
}

export const getAllAuthors = async (params: any, dispatch: AppDispatch) : Promise<Author[] | void> => {
  dispatch(startLoading());
  return await axios.get<Author[]>(`${AUTHOR_GET_ALL}`, {params})
    .then((res : AxiosResponse<Author[]>) => res.data)
    .catch(function (error) {
      console.log(error);
      dispatch(setError(`${error.response?.status || 500}. Ошибка при получении всех авторов.`));
      dispatch(showModal());
    })
    .finally(() => dispatch(stopLoading()));
}

export const getAllAuthorsCountry = async (dispatch: AppDispatch) : Promise<string[] | void> => {
  dispatch(startLoading());
  return await axios.get<string[]>(`${AUTHOR_GET_ALL_COUNTRIES}`)
  .then((res : AxiosResponse<string[]>) => res.data)
  .catch(function (error) {
    console.log(error);
    dispatch(setError(`${error.response?.status || 500}. Ошибка при получении всех стран авторов.`));
    dispatch(showModal());
  })
  .finally(() => dispatch(stopLoading()));
}