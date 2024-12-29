import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../ui/SearchWrapper.css'
import { navigateHandler } from "../../../util/searchNavigateHandler";

// FilterForm.tsx
export interface PenaltyFilterFormInterface {
  reader_name: string | undefined, 
  reader_email: string | undefined,
  reader_ticket: string | undefined,
}

interface Props {
  filter: PenaltyFilterFormInterface,
}

export const PenaltyViewFilter: React.FC<Props> = ({filter}) => {
  const [filterForm, setFilterForm] = useState<PenaltyFilterFormInterface>(filter);
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
    navigateHandler(filterForm, navigate, "/orderView/?");
  };

  return (
    <div className="filter-form">
      <div>
        <label htmlFor="reader_name">Имя читателя</label>
        <input
          type="text"
          id="reader_name"
          value={filterForm.reader_name || ""}
          onChange={updateFilterForm}
        />
      </div>

      <div>
        <label htmlFor="reader_email">Почта читателя</label>
        <input
          type="text"
          id="reader_email"
          value={filterForm.reader_email || ""}
          onChange={updateFilterForm}
        />
      </div>

      <div>
        <label htmlFor="reader_ticket">Читательский билет</label>
        <input
          type="number"
          id="reader_ticket"
          value={filterForm.reader_ticket || ""}
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
