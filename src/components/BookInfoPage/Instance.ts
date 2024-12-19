import axios from "axios";
import { BOOK_READER_ADD, INSTANCE_GET } from "../../util/urls";
import { AppDispatch } from "../../store";
import { setError, showModal, startLoading, stopLoading } from "../../reducer/settingsStore";

export interface Instance{
  id_instance: number,
  supply_date: Date,
  publisher_name: string
}

function isInstanceArray(arr: any): arr is Instance[] {
  return Array.isArray(arr) && arr.every(isInstance);
}

function isInstance(obj: any): obj is Instance {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id_instance === "number" &&
    typeof obj.supply_date === "string" &&
    typeof obj.publisher_name === "string"
  );
}

export const getAllFreeInstances = async (id_instance: number, dispatch : AppDispatch) => {
  try {
    // dispatch(startLoading());
    const res = await axios.get(INSTANCE_GET + id_instance);
    const data = res.data;
    if (!isInstanceArray(data)) {
      throw new Error("Invalid data format received from server");
    }
    return data;
  }
  catch (error){
    dispatch(setError(`Can't get all free Instances ${error}`));
    dispatch(showModal());
  }
  finally {
    // dispatch(stopLoading());
  }
}



export const addInstanceToReader = async (id_instance: number, pickupDate: Date, returnDate: Date, jwt : string, dispatch: AppDispatch) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    },
  };

  const body = {
    "id_instance": id_instance,
    "borrow_date": pickupDate,
    "end_date": returnDate
  };
  try{
    dispatch(startLoading());
    const res = await axios.patch(BOOK_READER_ADD, body, config);
    const data = res.data;
    return data;
  }
  catch (error){
    dispatch(setError(`Error when add instance to reader ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
}