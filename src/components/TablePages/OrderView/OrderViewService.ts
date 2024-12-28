import axios from "axios";
import { Author } from "../../../Authors";
import { setError, showModal, startLoading, stopLoading } from "../../../reducer/settingsStore";
import { AppDispatch } from "../../../store";
import { BOOK_READER_ORDERS_ALL, INSTANCE_SUPPLY_GET_ALL, PENALTY_ADD, PENALTY_DELETE } from "../../../util/urls";

export interface Order{
  id_book_reader: number,
  reader_ticket: number,
  reader_name: string,
  reader_email: string,
  id_instance: number,
  id_book: number,
  book_name: string;
  publisher_name: string,
  borrow_date: string,
  end_date: string,
}

export const getAllOrder = async (params: any, jwt: string, dispatch: AppDispatch) => {
  try{
    dispatch(startLoading());
    const res = await axios.get(BOOK_READER_ORDERS_ALL, {
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


interface createPenalty{
  id_book_reader: number,
  start_time: string,
  payment: number,
}

export const add_penalty = async (params: createPenalty, jwt: string, dispatch: AppDispatch) => {
  try{
    dispatch(startLoading());
    const config = {
      headers: {
        "Authorization": "Bearer " + jwt
      }
    };
    const res = await axios.post(PENALTY_ADD, params, config);
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

export const delete_penalty = async (id_book_reader: number, jwt: string, dispatch: AppDispatch) => {
  try{
    dispatch(startLoading());
    const res = await axios.delete(`${PENALTY_DELETE}${id_book_reader}`, {
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