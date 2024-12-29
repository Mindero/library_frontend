import axios, { AxiosResponse } from "axios";
import { GENRE_GET_ALL, GET_BOOK_BY_NAME_URL, VIEW_BOOKS_GET_ALL_URL, VIEW_BOOKS_GET_BY_NAME } from "./util/urls";
import { Author } from "./Authors";
import { AppDispatch } from "./store";
import { setError, showModal, startLoading, stopLoading } from "./reducer/settingsStore";
import { Genre } from "./reducer/catalogStore/initState";

export interface Book {
  book_name: string,
  id_book: number,
  authors: Author[],
}

export const getAllBooks = async (dispatch : AppDispatch) : Promise<Book[] | void> => {
  dispatch(startLoading());
  return await axios.get<Book[]>(VIEW_BOOKS_GET_ALL_URL)
    .then((res : AxiosResponse<Book[]>) => res.data)
    .catch(function (error) {
      console.log(error);
      dispatch(setError(`${error.response?.status || 500}. Ошибка при получении всех книг.`));
      dispatch(showModal());
    })
    .finally(() => dispatch(stopLoading()));
}

export const getBooksBy = async (params:any, dispatch: AppDispatch) : Promise<Book[] | void> => {
  dispatch(startLoading());
  return await axios.get<Book[]>(VIEW_BOOKS_GET_ALL_URL, {params})
    .then((res : AxiosResponse<Book[]>) => res.data)
    .catch(function (error) {
      console.log(error);
      dispatch(setError(`${error.response?.status || 500}. Ошибка при получении всех книг.`));
      dispatch(showModal());
    })
    .finally(() => dispatch(stopLoading()));
}

export const getBookFormById = async (id : number, dispatch: AppDispatch) : Promise<Book | void> => {
  dispatch(startLoading());
  return await axios.get<Book>(GET_BOOK_BY_NAME_URL + id)
    .then((res : AxiosResponse<Book>) => res.data)
    .catch(function (error) {
      console.log(error);
      dispatch(setError(`${error.response?.status || 500}. Ошибка при получении всех книг по имени.`));
      dispatch(showModal());
    })
    .finally(() => dispatch(stopLoading()));
}

export const getAllBooksGenres = async (dispatch: AppDispatch) : Promise<Genre[] | void> => {
  dispatch(startLoading());
  return await axios.get<Genre[]>(GENRE_GET_ALL)
    .then((res : AxiosResponse<Genre[]>) => res.data)
    .catch(function (error) {
      console.log(error);
      dispatch(setError(`${error.response?.status || 500}. Ошибка при получении всех книг жанра.`));
      dispatch(showModal());
    })
    .finally(() => dispatch(stopLoading()));
}
