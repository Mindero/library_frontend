import axios from "axios"
import { READER_GET_URL } from "../../util/urls"
import { AppDispatch } from "../../store";
import { setError, showModal, startLoading, stopLoading } from "../../reducer/settingsStore";

export const checkAdmin = async (jwt : string, dispatch : AppDispatch)  => {
  const config = {
    headers: {
      "Authorization": "Bearer " + jwt
    }
  };
  try{
    dispatch(startLoading());
    const res = await axios.get(READER_GET_URL, config);
    return res.data.role;
  }
  catch (error){
    dispatch(setError(`Error when check admin ${error}`));
    dispatch(showModal());
  }
  finally{
    dispatch(stopLoading());
  }
} 