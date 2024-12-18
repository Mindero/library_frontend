import { useNavigate } from "react-router-dom"

export const AdminRights = () => {
  const navigate = useNavigate();

  const navigateHandle = (to : string) => {
    navigate(to);
  }
  return (
    <div>
      <p>Admin rights </p>
      <span>
        <button onClick={() => navigateHandle("/readers")}>Readers table</button>
        <button onClick={() => navigateHandle("/authors")}>Authors table</button>
        <button onClick={() => navigateHandle("/books")}>Books table</button>
        <button onClick={() => navigateHandle("/publishers")}>Publishers table</button>
        <button onClick={() => navigateHandle("/genres")}>Genres table</button>
        <button onClick={() => navigateHandle("/authors_book")}>Authors_book view</button>
        <button onClick={() => navigateHandle("/book_genres")}>Book_genres table</button>
        <button onClick={() => navigateHandle("/book_instance")}>Book_instance table</button>
        <button onClick={() => navigateHandle("/book_publisher")}>Book_publisher table</button>
        <button onClick={() => navigateHandle("/book_reader")}>Book_reader table</button>
        <button onClick={() => navigateHandle("/penalty")}>Penalty table</button>
      </span>
    </div>
  )
}