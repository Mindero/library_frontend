import axios from "axios";
import { setError, showModal, startLoading, stopLoading } from "../../../reducer/settingsStore";
import { AppDispatch } from "../../../store";
import { PENALTY_GET_READERS } from "../../../util/urls";

export interface PenaltyReader{
  reader_ticket: number,
  name: string,
  phone_number: string,
  email: string,
  sum_payment: number
  cnt: number
}

export const getAllPenaltyReaders = async (jwt : string, dispatch: AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.get(`${PENALTY_GET_READERS}`, config);
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