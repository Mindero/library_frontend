import axios from "axios";
import { Author } from "../../../Authors";
import { setError, showModal, startLoading, stopLoading } from "../../../reducer/settingsStore";
import { AppDispatch } from "../../../store";
import { BOOK_READER_ORDERS_ALL, INSTANCE_SUPPLY_GET_ALL } from "../../../util/urls";

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