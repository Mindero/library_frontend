import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Author, getAllAuthorBook } from "../Authors";
import { useDispatch, useSelector } from "react-redux";
import { catalogExpandedAuthor, catalogExpandedAuthorBooks } from "../reducer/catalogStore/reducer";
import { setExpandedAuthor, setExpandedAuthorBooks } from "../reducer/catalogStore";
import '../components/ui/authorListToHtml.css'

interface AuthorProps {
  authors: Author[];
}
export interface AuthorBook{
  id_book: number,
  book_name: string,
  book_year: number
}

export const AuthorListToHtml: React.FC<AuthorProps> = ({ authors }): JSX.Element => {
  const navigate = useNavigate();
  const expandedAuthor = useSelector(catalogExpandedAuthor);
  const books = useSelector(catalogExpandedAuthorBooks);
  const dispatch = useDispatch();
  
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleAuthorClick = (id_author: number) => {
    if (id_author === expandedAuthor) dispatch(setExpandedAuthor(null));
    else{
      dispatch(setExpandedAuthor(id_author));
      getAllAuthorBook(id_author, dispatch).then((data) => {
        if (data !== undefined) dispatch(setExpandedAuthorBooks(data));
      })
    } 
  };
  const handleNavigateToProfile = (id_author: number) => {
    console.log(`id_author = ${id_author}`)
    navigate(`/author/${id_author}`);
  };
  
  console.log(`expandedAuthor=${expandedAuthor}`);
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     setSearchTerm(event.target.value.toLowerCase());
   };
  return (
      <div className="author-list-to-html-container" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
        {authors.map((author) => (
          <div key={author.id_author} className="author-to-html-item">
            <div className="author-to-html-header" onClick={() => handleAuthorClick(author.id_author)} >
              <h3>{author.name}</h3>
              <button onClick={() => handleNavigateToProfile(author.id_author)} className="profile-button">
                View Profile
              </button>
            </div>

            {(expandedAuthor === author.id_author) ? (
              <div className="author-to-html-details">
              <input
                type="text"
                placeholder="Поиск книг..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="author-to-html-search-input" />
        
              <div className="author-to-html-book-list">
                {books
                  .filter((book) => (searchTerm === "" || book.book_name.toLowerCase().startsWith(searchTerm)))
                  .map((book) => (
                    <p key={book.id_book} className="author-to-html-book-item" onClick={() =>{
                      navigate(`/book/${book.id_book}`)
                    }}>
                      {book.book_name}
                    </p>
                  ))}
              </div>
        
              {books.filter((book) => book.book_name.toLowerCase().includes(searchTerm)).length === 0 && (
                <p className="author-to-html-no-results">У автора нет книг с таким названием.</p>
              )}
            </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
  );
};
