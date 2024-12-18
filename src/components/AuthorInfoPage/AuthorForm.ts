import axios from "axios";
import { VIEW_BOOKS_GET_BY_AUTHOR_ID, AUTHOR_GET_BY_ID_URL } from "../../util/urls";
import { Book } from "../../Book";

export interface AuthorForm{
  author_name: string,
  books: Book[],
}
export const getAuthorBooksById = async (id: string | undefined) => {
  try{
    const res = await axios.get(`${VIEW_BOOKS_GET_BY_AUTHOR_ID}${id}`);
    console.log(res);
    const data = res.data;
    return data;
  }
  catch (error){
    console.log("Can't get author by id " + error);
  }
}
export const getAuthorById = async (id: string | undefined) => {
  try{
    const res = await axios.get(`${AUTHOR_GET_BY_ID_URL}${id}`);
    console.log(res);
    const data = res.data; 
    return data;
  }
  catch(error){
    console.log("Can't get author by id " + error);
  }
}