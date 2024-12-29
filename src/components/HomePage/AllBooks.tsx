import { useEffect, useState } from "react"
import { Book, getAllBooks } from "../../Book";
import { BookListToHtml } from "../../util/bookListToHtml";
import { useDispatch } from "react-redux";
import { LoadingWrapper } from "../LoadingWrapper/settingsLoading";

export const AllBooks = () => {
  const [booksList, setBooksList] = useState<Book[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllBooks(dispatch).then(data => {
      if (data !== undefined)
        setBooksList(data);
    })
  }, []);

  return (
    <div>
      <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#333',
          textAlign: 'left',
          paddingLeft: "15px"
        }}>Все книги</h1>
      <LoadingWrapper dispatch={dispatch}>
        <BookListToHtml booksList = {booksList} showAuthors={true}/>
      </LoadingWrapper>
    </div>
  )
}