import axios from "axios";
import { Author } from "../../../Authors";
import { setError, showModal, startLoading, stopLoading } from "../../../reducer/settingsStore";
import { AppDispatch } from "../../../store";
import { BOOK_READER_ORDERS_ALL, INSTANCE_SUPPLY_GET_ALL, PENALTY_VIEW_GET_ALL } from "../../../util/urls";

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

export const getAllPenalties = async (params: any, jwt: string, dispatch: AppDispatch) => {
  try{
    dispatch(startLoading());
    const res = await axios.get(PENALTY_VIEW_GET_ALL, {
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