import axios from "axios";
import { READER_ADD, READER_DELETE, READER_GET_ALL_URL, READER_UPDATE} from "../../../util/urls";

export interface ReaderForm{
  name: string,
  email: string,
  phone_number: string,
  password: string,
  role: string,
}

export interface ReaderCreateUpdateForm{
  name: string,
  email: string,
  phone_number: string,
  role: string,
}

export interface Reader {
  reader_ticket: number;
  name: string;
  email: string;
  phone_number: string,
  role: string;
}

// Получение всех читателей
export const fetchAllReaders = async (jwt : string) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  const res = await axios.get(`${READER_GET_ALL_URL}`, config);
  return res.data;
};

// Добавление нового читателя
export const addReader = async (jwt : string, form: ReaderForm) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  const res = await axios.post(READER_ADD, form, config);
  return res.data;
};

// Обновление читателя
export const updateReader = async (jwt : string, id_reader: number, form: ReaderForm) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  const res = await axios.put(`${READER_UPDATE}${id_reader}`, form, config);
  return res.data;
};

// Удаление читателя
export const deleteReader = async (jwt : string, id_reader: number) => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  const res = await axios.delete(`${READER_DELETE}${id_reader}`, config);
};