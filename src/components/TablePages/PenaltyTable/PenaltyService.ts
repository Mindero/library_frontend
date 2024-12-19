import axios from "axios";
import { AppDispatch } from "../../../store";
import { setError, showModal, startLoading, stopLoading } from "../../../reducer/settingsStore";
import { PENALTY_ADD, PENALTY_DELETE, PENALTY_GET_ALL, PENALTY_UPDATE } from "../../../util/urls";

export interface PenaltyForm{
  id_book_reader: number,
  start_time: string,
  payment: number
}

export interface Penalty extends PenaltyForm {
}

export const fetchAllPenalty = async (jwt : string, dispatch: AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.get(`${PENALTY_GET_ALL}`, config);
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

export const addPenalty = async (jwt : string, form: PenaltyForm, dispatch: AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.post(PENALTY_ADD, form, config);
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

export const updatePenalty = async (jwt : string, id_instance: number, form: PenaltyForm, dispatch : AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.put(`${PENALTY_UPDATE}${id_instance}`, form, config);
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

export const deletePenalty = async (jwt : string, id_instance: number, dispatch: AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    await axios.delete(`${PENALTY_DELETE}${id_instance}`, config);
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