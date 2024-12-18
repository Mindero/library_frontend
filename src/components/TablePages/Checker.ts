import axios from "axios"
import { READER_GET_URL } from "../../util/urls"

export const checkAdmin = async (jwt : string)  => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  const res = await axios.get(READER_GET_URL, config);
  return res.data.role;
} 