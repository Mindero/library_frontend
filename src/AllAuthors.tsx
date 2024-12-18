import { useNavigate } from "react-router-dom";
import { Author } from "./Authors";

interface AllAuthorsProps {
  authors: Author[];
}


export const AllAuthors = ({ authors } : AllAuthorsProps) : JSX.Element => {
  const navigate = useNavigate();

  const onClick = (id_author : number) => {
    navigate(`/author/${id_author}`);
  }

  return (
    <span>
      Авторы: {authors.map((author) => {
        return <button onClick={() => onClick(author.id)}>
          {author.name}
        </button>
      })}
    </span>
  )
}