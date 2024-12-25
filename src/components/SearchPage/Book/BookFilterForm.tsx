import { ChangeEvent, useEffect, useState } from "react";
import { Params, useNavigate } from "react-router-dom";
import '../../ui/SearchWrapper.css'
import { navigateHandler } from "../../../util/searchNavigateHandler";
import { useSelector } from "react-redux";
import { catalogBooksGenres } from "../../../reducer/catalogStore/reducer";
import { Genre } from "../../../reducer/catalogStore/initState";

// FilterForm.tsx
export interface BookFilterFormInterface {
  genre: string | undefined,
  year_left: string | undefined,
  year_right: string | undefined,
  available: boolean,
  name: string | undefined
}

interface Props {
  filter: BookFilterFormInterface,
  params: Params<string>,
}

export const BookFilterForm: React.FC<Props> = ({filter, params}) => {
  const [filterForm, setFilterForm] = useState<BookFilterFormInterface>(filter);
  const navigate = useNavigate();
  const genres : Genre[] = [{id:-1, name:"Все жанры", url:""}, ...useSelector(catalogBooksGenres)];
  const updateFilterForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    console.log(id, value);
    setFilterForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const applyFilters = () => {
    // Применяем все фильтры при нажатии на кнопку
    console.log(filterForm); // Печать текущего состояния фильтров
    navigateHandler({...filterForm, type:"books"}, navigate); // Навигация с актуальными фильтрами
  };

  return (
    <div className="filter-form">
      {/* Жанр */}
      <div>
        <label htmlFor="genre">Жанр </label>
        <select
          id="genre"
          value={filterForm.genre || ""}
          onChange={updateFilterForm}
        >
          {genres.map((genre : Genre) => {
            return (
              <option value={genre.url}>
                {genre.name}
              </option>
            )
          })}
        </select>
      </div>

      {/* Год выпуска (с) */}
      <div>
        <label htmlFor="year_left">Год выпуска (с)</label>
        <input
          type="number"
          id="year_left"
          value={filterForm.year_left || ""}
          onChange={updateFilterForm}
        />
      </div>

      {/* Год выпуска (по) */}
      <div>
        <label htmlFor="year_right">Год выпуска (по)</label>
        <input
          type="number"
          id="year_right"
          value={filterForm.year_right || ""}
          onChange={updateFilterForm}
        />
      </div>

      {/* Наличие */}
      <div>
        <label htmlFor="available" className="checkbox-label">
          Есть в наличии
          <input
            type="checkbox"
            id="available"
            checked={filterForm.available}
            onChange={() => {
              setFilterForm((prevState) => ({
                ...prevState,
                ['available']: !filterForm.available,
              }));
            }}
            className="checkbox"
          />
          <span className="checkbox-custom"></span>
        </label>
      </div>

      {/* Кнопка для применения фильтров */}
      <div>
        <button type="button" className="apply-filters-button" onClick={applyFilters}>Применить фильтры</button>
      </div>
    </div>
  );
};
