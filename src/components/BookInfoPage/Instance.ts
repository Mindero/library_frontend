import axios from "axios";
import { BOOK_READER_ADD, INSTANCE_GET } from "../../util/urls";

export interface Instance{
  id_instance: number,
  supply_date: Date,
  publisher_name: string
}

export const getAllFreeInstances = async (id_instance: number) => {
  try{
    const res = await axios.get(INSTANCE_GET + id_instance)
    const data = res.data
    return data
  }
  catch (error){
    console.log("Can't get all free Instances " + error);
  }
}

export const addInstanceToReader = async (id_instance: number, pickupDate: Date, returnDate: Date, jwt : string) => {
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

  const res = await axios.patch(BOOK_READER_ADD, body, config);
  return res.data;
}