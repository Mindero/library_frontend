import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../ui/SearchWrapper.css'
import { navigateHandler } from "../../../util/searchNavigateHandler";
import { useSelector } from "react-redux";
import { catalogAuthorCountries, catalogBooksGenres } from "../../../reducer/catalogStore/reducer";

// FilterForm.tsx
export interface AuthorFilterFormInterface {
  country: string | undefined,
}

interface Props {
  filter: AuthorFilterFormInterface,
}

export const AuthorFilterForm: React.FC<Props> = ({filter}) => {
  const ALL_COUNTRIES = "Все страны";
  const [filterForm, setFilterForm] = useState<AuthorFilterFormInterface>(filter);
  const navigate = useNavigate();
  const countries : string[] = [ALL_COUNTRIES, ...useSelector(catalogAuthorCountries)];
  const updateFilterForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    console.log(id, value);
    setFilterForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const applyFilters = () => {
    // console.log(filterForm);
    (filterForm.country === ALL_COUNTRIES) ? (
      navigateHandler({...filterForm, country: "", type:"authors"}, navigate)
    ): (
      navigateHandler({...filterForm, type:"authors"}, navigate) // Навигация с актуальными фильтрами
    )
  };

  return (
    <div className="filter-form">
      {/* Страна */}
      <div>
        <label htmlFor="country">Страна </label>
        <select
          id="country"
          value={filterForm.country || ""}
          onChange={updateFilterForm}
        >
          {countries.map((country : string) => {
            return (
              <option value={country}>
                {country}
              </option>
            )
          })}
        </select>
      </div>

      {/* Кнопка для применения фильтров */}
      <div>
        <button type="button" className="apply-filters-button" onClick={applyFilters}>Применить фильтры</button>
      </div>
    </div>
  );
};
