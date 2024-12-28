import { ChangeEvent, useEffect, useState } from "react";
import { Params, useNavigate } from "react-router-dom";
import '../../ui/SearchWrapper.css'
import { navigateHandler } from "../../../util/searchNavigateHandler";

// FilterForm.tsx
export interface OrderFilterFormInterface {
  reader_name: string | undefined, 
  reader_email: string | undefined,
  reader_ticket: string | undefined,
  book_name: string | undefined,
  publisher_name: string | undefined,
  borrow_date: string | undefined,
  end_date: string | undefined,
}

interface Props {
  filter: OrderFilterFormInterface,
  params: Params<string>,
}

export const OrderViewFilter: React.FC<Props> = ({filter, params}) => {
  const [filterForm, setFilterForm] = useState<OrderFilterFormInterface>(filter);
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
        <label htmlFor="reader_name">Имя читателя </label>
        <input
          type="text"
          id="reader_name"
          value={filterForm.reader_name || ""}
          onChange={updateFilterForm}
        />
      </div>

      <div>
        <label htmlFor="reader_email">Почта читателя </label>
        <input
          type="text"
          id="reader_email"
          value={filterForm.reader_email || ""}
          onChange={updateFilterForm}
        />
      </div>

      <div>
        <label htmlFor="reader_ticket">Читательский билет </label>
        <input
          type="number"
          id="reader_ticket"
          value={filterForm.reader_ticket || ""}
          onChange={updateFilterForm}
        />
      </div>

      <div>
        <label htmlFor="book_name">Название книги </label>
        <input
          type="text"
          id="book_name"
          value={filterForm.book_name || ""}
          onChange={updateFilterForm}
        />
      </div>

      <div>
        <label htmlFor="publisher_name">Название издателя </label>
        <input
          type="text"
          id="publisher_name"
          value={filterForm.publisher_name || ""}
          onChange={updateFilterForm}
        />
      </div>

      <div>
        <label htmlFor="borrow_date">Дата получения </label>
        <input
          type="date"
          id="borrow_date"
          value={filterForm.borrow_date || ""}
          onChange={updateFilterForm}
        />
      </div>

      <div>
        <label htmlFor="end_date">Дата возврата читателем </label>
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
