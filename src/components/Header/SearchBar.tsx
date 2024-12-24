import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../ui/Header.css'
import { navigateHandler } from "../../util/searchNavigateHandler";

export const SearchBar = () => {
  const [query, setQuery] = useState<string>("");

  const navigate = useNavigate();

  const onClick = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    console.log(query);
    (query !== "") ? 
    navigateHandler({name:query}, navigate)
    : console.log("query is empty"); 
  }

  return (
    <div className="search-bar" >
      <form onSubmit={onSubmit} className="search-form">
        <input 
          type="text"
          value={query}
          onChange = {onClick}
          placeholder="Я ищу..."
          className="search-input"
        />
       <button type="submit" className="search-button" aria-label="Найти">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="search-icon"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
    </div>
  )
}