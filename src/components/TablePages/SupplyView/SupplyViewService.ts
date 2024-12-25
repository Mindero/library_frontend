import axios from "axios";
import { Author } from "../../../Authors";
import { setError, showModal, startLoading, stopLoading } from "../../../reducer/settingsStore";
import { AppDispatch } from "../../../store";
import { INSTANCE_SUPPLY_ADD, INSTANCE_SUPPLY_DELETE, INSTANCE_SUPPLY_GET_ALL } from "../../../util/urls";

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

export interface deleteSupply {
  id_book: number, 
  supply_date: string,
  publisher_name: string
}

export const delete_supply = async (params: deleteSupply, jwt: string, dispatch: AppDispatch) => {
  try{
    dispatch(startLoading());
    
    const res = await axios.delete(INSTANCE_SUPPLY_DELETE, {
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

export interface createSupply{
  book_name: string,
  publisher_name:string,
  supply_date:string,
  count:number
}

export const add_supply = async (params: createSupply, jwt: string, dispatch: AppDispatch) => {
  try{
    dispatch(startLoading());
    const config = {
      headers: {
        "Authorization": "Bearer " + jwt
      }
    };
    const res = await axios.post(INSTANCE_SUPPLY_ADD, params, config);
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