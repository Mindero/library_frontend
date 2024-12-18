import axios from "axios";
import { GET_BOOK_BY_NAME_URL, VIEW_BOOKS_GET_ALL_URL, VIEW_BOOKS_GET_BY_NAME } from "./util/urls";
import { Author } from "./Authors";

export interface Book {
  book_name: string,
  id_book: number,
  authors: Author[],
}



export const getAllBooks = async () => {
  // console.log("URL " + VIEW_BOOKS_GET_ALL_URL);
  const res = await axios.get(VIEW_BOOKS_GET_ALL_URL);
  const data = res.data;
  return data;
}

export const getBooksByName = async (name : string) => {
  // console.log("URL " + VIEW_BOOKS_GET_BY_NAME);
  try{
    const res = await axios.get(VIEW_BOOKS_GET_BY_NAME + name);
    const data = res.data;
    return data;
  }
  catch (error){
    console.log("Error with view books get by name", error);
  }
}

export const getBookFormById = async (id : number) => {
  try{
    const res = await axios.get(GET_BOOK_BY_NAME_URL + id,);
    const data = res.data;
    return data;
  }
  catch (error){
    console.log("Can't get book by name " + error);
  }
}