import axios from "axios";
import { GENRE_ADD, GENRE_DELETE, GENRE_GET_ALL, GENRE_UPDATE } from "../../../util/urls";
import { AppDispatch } from "../../../store";
import { setError, showModal, startLoading, stopLoading } from "../../../reducer/settingsStore";

export interface GenreForm{
  name: string
  url: string
}

export interface Genre extends GenreForm {
  id_genre: number
}

export const fetchAllGenres = async (jwt : string, dispatch: AppDispatch) : Promise<Genre[] | void> => {
  try{
    dispatch(startLoading());
    const res = await axios.get(`${GENRE_GET_ALL}`);
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

export const addGenre = async (jwt : string, form: GenreForm, dispatch: AppDispatch) : Promise<true | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.post(GENRE_ADD, form, config);
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

export const updateGenre = async (jwt : string, id_genre: number, form: GenreForm, dispatch : AppDispatch
  ) : Promise<true | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.put(`${GENRE_UPDATE}${id_genre}`, form, config);
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

export const deleteGenre = async (jwt : string, id_genre: number, dispatch: AppDispatch) : Promise<true | void> => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.delete(`${GENRE_DELETE}${id_genre}`, config);
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