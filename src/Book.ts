import axios from "axios";
import { VIEW_BOOKS_GET_ALL_URL, VIEW_BOOKS_GET_BY_NAME } from "./util/urls";

interface Book {
  id_author_book: number,
  book_name: string,
  author_name: string,
  id_author: number,
  id_book: number,
}
export default Book

export const getAllBooks = async () => {
  console.log("URL " + VIEW_BOOKS_GET_ALL_URL);
  const res = await axios.get(VIEW_BOOKS_GET_ALL_URL);
  const data = res.data;
  return data;
}

export const getBooksByName = async (name : string) => {
  console.log("URL " + VIEW_BOOKS_GET_BY_NAME);
  try{
    const res = await axios.get(VIEW_BOOKS_GET_BY_NAME + name);
    const data = res.data;
    return data;
  }
  catch (error){
    console.log("Error with view books get by name", error);
  }
}