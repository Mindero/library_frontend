import { useDispatch, useSelector } from "react-redux";
import { setShowCatalogSideBar } from "../../reducer/settingsStore";
import { settingsShowCatalogSideBar } from "../../reducer/settingsStore/reducer";
import { useEffect, useRef, useState } from "react";
import '../ui/Sidebar.css';
import { SidebarBooks } from "./sidebarBooks";
import { SidebarAuthors } from "./sidebarAuthors";

export const CatalogSidebar = () => {
  const show = useSelector(settingsShowCatalogSideBar); // Состояние открытия панели
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState<"Книги" | "Авторы">("Книги");
  const [isTransitioning, setIsTransitioning] = useState(false); // Для отслеживания анимации
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        dispatch(setShowCatalogSideBar(false)); // Закрытие панели при клике вне её области
        setIsTransitioning(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const selector : Record<'Книги' | 'Авторы', JSX.Element> = {
    'Книги':  <SidebarBooks/>,
    'Авторы': <SidebarAuthors/>,
  };

  const handleTypeChange = (type: "Книги" | "Авторы") => {
    if (selectedType !== type) {
      setIsTransitioning(true); // Начинаем анимацию скрытия
      setTimeout(() => {
        setSelectedType(type); // Меняем тип после завершения анимации
        setIsTransitioning(false);
      }, 300); // Задержка, равная длительности анимации
    }
  };

  return (
    <>
    {show && <div className="overlay" onClick={() => dispatch(setShowCatalogSideBar(false))}></div>}
    <div
      ref={ref}
      className={`sidebar ${show ? "open" : ""}`}
    >
      <button
        className="close-button"
        onClick={() => dispatch(setShowCatalogSideBar(false))}
      >
        ×
      </button>
      <h2>Каталог</h2>

      {/* Выбор: Книги или Авторы */}
      <div className="sidebar-outside-section">
        <button
            className={`catalog-choice ${selectedType === 'Книги' ? 'selected' : ''}`}
            onClick={() => handleTypeChange('Книги')}
          >
            Книги
          </button>
          <button
            className={`catalog-choice ${selectedType === 'Авторы' ? 'selected' : ''}`}
            onClick={() => handleTypeChange('Авторы')}
          >
            Авторы
          </button>
      </div>
      {/* Секция с контентом для выбранной категории */}
      <div
          className={`sidebar-inner-section ${show && !isTransitioning ? "open" : ""}`}
        >
          {selector[selectedType]}
        </div>
    </div>
  </>
  );
};
