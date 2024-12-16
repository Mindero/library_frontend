import { READER_LOGIN_URL } from "../../util/urls";
import axios from "axios";
import LoginForm from "./LoginForm";

export const postLoginForm = async (loginForm: LoginForm) => {
  const form_data : FormData = new FormData()

  form_data.append("username", loginForm.username)
  form_data.append("password", loginForm.password)
  console.log("URL " + READER_LOGIN_URL);
  const res = await axios.post(READER_LOGIN_URL, form_data);
  return res.data;
}