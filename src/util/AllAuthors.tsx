import { useNavigate } from "react-router-dom";
import { Author } from "../Authors";

interface AllAuthorsProps {
  authors: Author[];
}


export const AllAuthors = ({ authors } : AllAuthorsProps) : JSX.Element => {
  const navigate = useNavigate();

  const onClick = (id_author : number) => {
    navigate(`/author/${id_author}`);
  }

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '10px',
      marginTop: '10px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <span style={{ fontWeight: 'bold', color: '#333', marginRight: '5px' }}>Авторы:</span>
      {authors.map((author) => (
        <button
          key={author.id_author}
          onClick={() => onClick(author.id_author)}
          style={{
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '5px 10px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#5a6268')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#6c757d')}
        >
          {author.name}
        </button>
      ))}
    </div>
  );
}