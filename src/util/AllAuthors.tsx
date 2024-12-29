import { useNavigate } from "react-router-dom";
import { Author } from "../Authors";
import "../components/ui/AllAuthors.css";

interface AllAuthorsProps {
  authors: Author[];
}

export const AllAuthors = ({ authors }: AllAuthorsProps): JSX.Element => {
  const navigate = useNavigate();

  const onClick = (id_author: number) => {
    navigate(`/author/${id_author}`);
  };

  return (
    <div className="allAuthors_container">
      <span className="allAuthors_title">Авторы:</span>
      {authors.map((author) => (
        <button
          key={author.id_author}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onClick(author.id_author)
          }}
          className="allAuthors_button"
        >
          {author.name}
        </button>
      ))}
    </div>
  );
};
