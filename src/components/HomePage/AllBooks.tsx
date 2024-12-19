import { useEffect, useState } from "react"
import { Book, getAllBooks } from "../../Book";
import { BookListToHtml } from "../../bookListToHtml";
import { useDispatch } from "react-redux";
import { LoadingWrapper } from "../LoadingWrapper/settingsLoading";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";

export const AllBooks = () => {
  const [booksList, setBooksList] = useState<Array<Book>>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllBooks(dispatch).then(data => {
      if (data !== undefined)
        setBooksList(data);
    })
  }, []);

  return (
    <div>
      <LoadingWrapper dispatch={dispatch}>
        <hr/>
        <BookListToHtml booksList = {booksList}/>
      </LoadingWrapper>
    </div>
  )
}