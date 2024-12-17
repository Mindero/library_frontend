import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [query, setQuery] = useState<string>("");

  const navigate = useNavigate();

  const onClick = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const onSubmit = () => {
    console.log(query);
    (query !== "") ? 
    navigate(`/search/${query}`)
    : console.log("query is empty"); 
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          type="text"
          value={query}
          onChange = {onClick}
          placeholder="Впишите название книги"
        />
        <button type = "submit"> Найти </button>
      </form>
    </div>
  )
}