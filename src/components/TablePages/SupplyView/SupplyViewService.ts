import axios from "axios";
import { Author } from "../../../Authors";
import { setError, showModal, startLoading, stopLoading } from "../../../reducer/settingsStore";
import { AppDispatch } from "../../../store";
import { INSTANCE_SUPPLY_GET_ALL } from "../../../util/urls";

export interface SupplyBook{
  id_book: number,
  book_name: string,
  authors: Author[],
  publisher_name: string,
  supply_date: string,
  count: number
}

export const getSupplyBooks = async (params: any, jwt: string, dispatch: AppDispatch) => {
  try{
    dispatch(startLoading());
    const res = await axios.get(INSTANCE_SUPPLY_GET_ALL, {
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