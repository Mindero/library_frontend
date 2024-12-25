import { ChangeEvent, useEffect, useState } from "react";
import { Params, useNavigate } from "react-router-dom";
import '../../ui/SearchWrapper.css'
import { navigateHandler } from "../../../util/searchNavigateHandler";

// FilterForm.tsx
export interface SupplyFilterFormInterface {
  book_name: string | undefined,
  author_name: string | undefined,
  start_date: string | undefined,
  end_date: string | undefined,
}

interface Props {
  filter: SupplyFilterFormInterface,
  params: Params<string>,
}

export const SupplyViewFilter: React.FC<Props> = ({filter, params}) => {
  const [filterForm, setFilterForm] = useState<SupplyFilterFormInterface>(filter);
  const navigate = useNavigate();
  const updateFilterForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFilterForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const applyFilters = () => {
    // Применяем все фильтры при нажатии на кнопку
    navigateHandler(filterForm, navigate, "/supplyView/?");
  };

  return (
    <div className="filter-form">
      <div>
        <label htmlFor="book_name">Название книги</label>
        <input
          type="text"
          id="book_name"
          value={filterForm.book_name || ""}
          onChange={updateFilterForm}
        />
      </div>

      <div>
        <label htmlFor="author_name">Имя автора</label>
        <input
          type="text"
          id="author_name"
          value={filterForm.author_name || ""}
          onChange={updateFilterForm}
        />
      </div>

      <div>
        <label htmlFor="start_date">Начальная дата поставок</label>
        <input
          type="date"
          id="start_date"
          value={filterForm.start_date || ""}
          onChange={updateFilterForm}
        />
      </div>

      <div>
        <label htmlFor="end_date">Конечная дата поставок</label>
        <input
          type="date"
          id="end_date"
          value={filterForm.end_date || ""}
          onChange={updateFilterForm}
        />
      </div>

      {/* Кнопка для применения фильтров */}
      <div>
        <button type="button" className="apply-filters-button" onClick={applyFilters}>Применить фильтры</button>
      </div>
    </div>
  );
};
