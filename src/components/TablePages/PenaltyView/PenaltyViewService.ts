import axios from "axios";
import { setError, showModal, startLoading, stopLoading } from "../../../reducer/settingsStore";
import { AppDispatch } from "../../../store";
import { PENALTY_VIEW_GET_ALL } from "../../../util/urls";

export interface PenaltyBook {
  id_book: number,
  id_book_reader: number,
  book_name: string,
  publisher_name:string
  id_instance: number,
  start_time: string,
  payment: number
}

export interface Penalty{
  reader_ticket: number,
  reader_name: string,
  reader_email: string,
  count_penalty: number,
  sum_penalty: number,
  books: PenaltyBook[]
}

export const getAllPenalties = async (params: any, jwt: string, dispatch: AppDispatch) : Promise<Penalty[] | void> => {
  try{
    dispatch(startLoading());
    const res = await axios.get<Penalty[]>(PENALTY_VIEW_GET_ALL, {
      params,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
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