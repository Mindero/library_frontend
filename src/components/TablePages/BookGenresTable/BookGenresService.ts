import axios from "axios";
import { BOOK_GENRE_GET_ALL, BOOK_GENRE_ADD, BOOK_GENRE_DELETE, BOOK_GENRE_UPDATE} from "../../../util/urls";
import { AppDispatch } from "../../../store";
import { setError, showModal, startLoading, stopLoading } from "../../../reducer/settingsStore";

export interface BookGenreForm{
  id_book: number,
  id_genre: number
}

export interface BookGenre extends BookGenreForm {
  book_name: string,
  genre_name: string,
  id_book_genres: number
}

export const fetchAllBookGenre = async (jwt : string, dispatch: AppDispatch) : Promise<BookGenre[] | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.get<BookGenre[]>(`${BOOK_GENRE_GET_ALL}`, config);
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

export const addBookGenre = async (jwt : string, form: BookGenreForm, dispatch: AppDispatch) : Promise<true | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.post(BOOK_GENRE_ADD, form, config);
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

export const updateBookGenre = async (jwt : string, id_book_genre: number, form: BookGenreForm, dispatch : AppDispatch
  ) : Promise<true | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.put(`${BOOK_GENRE_UPDATE}${id_book_genre}`, form, config);
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

export const deleteBookGenre = async (jwt : string, id_book_genre: number, dispatch: AppDispatch) : Promise<true | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.delete(`${BOOK_GENRE_DELETE}${id_book_genre}`, config);
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