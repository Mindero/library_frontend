import { READER_REGISTER_URL } from "../../util/urls";
import RegisterForm from "./RegisterForm";
import axios from "axios";

export const postRegisterForm = async (registerForm: RegisterForm) => {
  const res = await axios.post(READER_REGISTER_URL, registerForm);
  return res.data;
}