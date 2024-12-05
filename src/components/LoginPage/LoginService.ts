import { READER_LOGIN_URL } from "../../util/urls";
import axios from "axios";
import LoginForm from "./LoginForm";

export const postLoginForm = async (loginForm: LoginForm) => {
  console.log("URL " + READER_LOGIN_URL);
  const res = await axios.post(READER_LOGIN_URL, loginForm);
  return res.data;
}