import axios, {  AxiosResponse } from "axios";
import { BOOK_READER_ADD, INSTANCE_GET } from "../../util/urls";
import { AppDispatch } from "../../store";
import { setError, showModal, startLoading, stopLoading } from "../../reducer/settingsStore";

export interface Instance{
  id_instance: number,
  supply_date: Date,
  publisher_name: string
}

export const getAllFreeInstances = async (id_instance: number, dispatch : AppDispatch) : Promise<Instance[] | void> => {
  return await axios.get<Instance[]>(INSTANCE_GET + id_instance)
    .then((res : AxiosResponse<Instance[]>) => res.data)
    .catch(function (error) {
      console.log(error);
      dispatch(setError(`${error.response?.status || 500}. Ошибка при получении всех свободных экземпляров книги.`));
      dispatch(showModal());
    })
    .finally(() => dispatch(stopLoading()));
}



export const addInstanceToReader = 
  async (id_instance: number, pickupDate: Date, returnDate: Date, jwt : string, dispatch: AppDispatch) : Promise<void> => {
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
  dispatch(startLoading());
  return await axios.patch<void>(BOOK_READER_ADD, body, config)
    .then(() => {})
    .catch(function (error) {
      console.log(error);
      dispatch(setError(`${error.response?.status || 500}. Ошибка при создании заказа.`));
      dispatch(showModal());
    })
    .finally(() => dispatch(stopLoading()));
}