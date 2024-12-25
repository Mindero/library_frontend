import { ChangeEvent, useState } from "react";
import { Params, useNavigate } from "react-router-dom";
import '../../ui/SearchWrapper.css';
import { navigateHandler } from "../../../util/searchNavigateHandler";
import { add_supply, createSupply } from "./SupplyViewService";
import { useDispatch, useSelector } from "react-redux";
import { userJwtSelector } from "../../../reducer/userStore/reducer";

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
  refreshKey:number;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>
}

export const SupplyViewFilter: React.FC<Props> = ({filter, params, refreshKey, setRefreshKey}) => {
  const jwt = useSelector(userJwtSelector);
  const dispatch = useDispatch();
  const [filterForm, setFilterForm] = useState<SupplyFilterFormInterface>(filter);
  const [newBookForm, setNewBookForm] = useState<createSupply>({
    book_name: '',
    supply_date: '',
    count: 1,
    publisher_name: ''
  });

  const navigate = useNavigate();

  const updateFilterForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFilterForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const updateNewBookForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewBookForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const applyFilters = () => {
    // Применяем все фильтры при нажатии на кнопку
    navigateHandler(filterForm, navigate, "/supplyView/?");
  };

  const handleAddNewBook = () => {
    if (jwt)
      add_supply(newBookForm, jwt, dispatch).then((data)=>{
        setRefreshKey(prevKey => prevKey + 1); // Изменение ключа, чтобы перерендерить компонент
    });
  };

  return (
    <div>
      <div className="filter-form">
        <h2>Фильтр поставок</h2>
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
      
      <div className="filter-form">
         {/* Форма для добавления новой книги */}
         <h2>Добавить новую книгу</h2>
        <div>
          <label htmlFor="new_book_name">Название книги </label>
          <input
            type="text"
            id="book_name"
            value={newBookForm.book_name}
            onChange={updateNewBookForm}
          />
        </div>

        <div>
          <label htmlFor="supply_date">Дата поставки </label>
          <input
            type="date"
            id="supply_date"
            value={newBookForm.supply_date}
            onChange={updateNewBookForm}
          />
        </div>

        <div>
          <label htmlFor="count">Количество поставленных книг </label>
          <input
            type="number"
            id="count"
            value={newBookForm.count}
            onChange={updateNewBookForm}
            min="1"
          />
        </div>

        <div>
          <label htmlFor="publisher_name">Название издателя </label>
          <input
            type="text"
            id="publisher_name"
            value={newBookForm.publisher_name}
            onChange={updateNewBookForm}
          />
        </div>

        <div>
          <button type="button" className="apply-filters-button" onClick={handleAddNewBook}>
            Добавить книгу
          </button>
        </div>
      </div>
    </div>
  );
};
