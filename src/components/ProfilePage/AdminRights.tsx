import { useNavigate } from "react-router-dom";
import '../ui/AdminRights.css';

export const AdminRights = () => {
  const navigate = useNavigate();

  const navigateHandle = (to: string) => {
    navigate(to);
  }

  return (
    <div className="admin-rights-container">
      <div className="admin-rights-section">
        <p><strong>Управление отчетами</strong></p>
        <button onClick={() => navigateHandle("/supplyView")}>Отчёт по поставкам</button>
        <button onClick={() => navigateHandle("/orderView")}>Отчёт по заказам</button>
        <button onClick={() => navigateHandle("/penaltyView")}>Отчет по должникам</button>
      </div>

      <div className="admin-rights-section">
        <p><strong>Управление таблицами</strong></p>
        <span>
          <button onClick={() => navigateHandle("/readers")}>Readers table</button>
          <button onClick={() => navigateHandle("/authors")}>Authors table</button>
          <button onClick={() => navigateHandle("/books")}>Books table</button>
          <button onClick={() => navigateHandle("/publishers")}>Publishers table</button>
          <button onClick={() => navigateHandle("/genres")}>Genres table</button>
          <button onClick={() => navigateHandle("/authors_book")}>Authors_book view</button>
          <button onClick={() => navigateHandle("/book_genres")}>Book_genres table</button>
          <button onClick={() => navigateHandle("/book_instance")}>Book_instance table</button>
          <button onClick={() => navigateHandle("/book_publisher")}>Book_publisher table</button>
          <button onClick={() => navigateHandle("/book_reader")}>Book_reader table</button>
          <button onClick={() => navigateHandle("/penalty")}>Penalty table</button>
        </span>
      </div>
    </div>
  );
};
