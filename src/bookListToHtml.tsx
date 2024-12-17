import Book from "./Book";

export const bookListToHtml = (booksList : Array<Book>) : JSX.Element[] => {
  const res: JSX.Element[] = booksList.map((book, index) => {
    // Добавляем return перед JSX
    return (
      <div data-index={index} key={book.id_author_book}> 
        <p>Book name: {book.book_name}</p>
        <p>Author name: {book.author_name}</p>
        <hr/>
      </div>
    );
  });
  return res;
}