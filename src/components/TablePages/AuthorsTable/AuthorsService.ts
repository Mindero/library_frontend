import axios from "axios";
import { AUTHOR_ADD, AUTHOR_DELETE, AUTHOR_GET_ALL, AUTHOR_UPDATE} from "../../../util/urls";
import { AppDispatch } from "../../../store";
import { setError, showModal, startLoading, stopLoading } from "../../../reducer/settingsStore";

export interface AuthorForm{
  name: string,
  country: string,
  birthday: string,
}

export interface Author {
  id_author: number
  name: string,
  country: string,
  birthday: string,
}

export const fetchAllAuthors = async (jwt : string, dispatch: AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.get(`${AUTHOR_GET_ALL}`, config);
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

export const addAuthor = async (jwt : string, form: AuthorForm, dispatch: AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.post(AUTHOR_ADD, form, config);
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

export const updateAuthor = async (jwt : string, id_author: number, form: AuthorForm, dispatch : AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.put(`${AUTHOR_UPDATE}${id_author}`, form, config);
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

export const deleteAuthor = async (jwt : string, id_author: number, dispatch: AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.delete(`${AUTHOR_DELETE}${id_author}`, config);
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