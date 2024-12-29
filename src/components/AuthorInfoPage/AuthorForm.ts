import axios, { AxiosResponse } from "axios";
import { VIEW_BOOKS_GET_BY_AUTHOR_ID, AUTHOR_GET_BY_ID_URL, AUTHOR_GET_ALL } from "../../util/urls";
import { Book } from "../../Book";
import { AppDispatch } from "../../store";
import { setError, showModal, startLoading, stopLoading } from "../../reducer/settingsStore";

export interface AuthorForm{
  id_author: number,
  author_name: string,
  books: Book[],
}

interface authorResponse {
  birthday: string,
  country: string,
  id_author: number,
  name: string
}

export const getAuthorBooksById = async (id: string | undefined, dispatch : AppDispatch) : Promise<Book[] | void> => {
  dispatch(startLoading());
  return await axios.get<Book[]>(`${VIEW_BOOKS_GET_BY_AUTHOR_ID}${id}`)
    .then((res: AxiosResponse<Book[]>) => res.data)
    .catch(function (error){
      console.log(error);
      dispatch(setError(`${error.response?.status || 500}. Ошибка при получении книг автора.`));
      dispatch(showModal());
    })
    .finally(() => dispatch(stopLoading()));
}
export const getAuthorById = async (id: string | undefined, dispatch: AppDispatch) : Promise<authorResponse | void> => {
  dispatch(startLoading());
  return await axios.get<authorResponse>(`${AUTHOR_GET_BY_ID_URL}${id}`)
    .then((res : AxiosResponse<authorResponse>) => res.data)
    .catch(function (error) {
      console.log(error);
      dispatch(setError(`${error.response?.status || 500}. Нет такого автора.`));
      dispatch(showModal());
    })
    .finally(() => dispatch(stopLoading()));
}