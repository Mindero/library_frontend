import axios from "axios";
import { Book } from "../../Book";
import { setError, showModal, startLoading, stopLoading } from "../../reducer/settingsStore";
import { AppDispatch } from "../../store";

interface totalAuthorInfo {
  id_author: number,
  name_author: string,
  books: Book[]
}