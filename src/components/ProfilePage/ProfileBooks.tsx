import React, { useEffect, useState } from 'react';
import { getProfileBooks, getProfilePenalty, Penalty, ProfileBook } from './ProfileService';
import { AppDispatch } from '../../store';
import { LoadingWrapper } from '../LoadingWrapper/settingsLoading';
import '../ui/ProfileBooks.css';

export const ProfileBooks = ({ jwt, dispatch }: { jwt: string, dispatch: AppDispatch }) => {
  const [profileBooks, setProfileBooks] = useState<ProfileBook[]>([]);
  const [penalty, setPenalty] = useState<Penalty[]>([]);
  const [activeTab, setActiveTab] = useState<'current' | 'completed'>('current');

  const [bookNameQuery, setBookNameQuery] = useState<string>(''); // Поиск по названию книги
  const [borrowDateQuery, setBorrowDateQuery] = useState<string>(''); // Поиск по дате получения
  const [returnDateQuery, setReturnDateQuery] = useState<string>(''); // Поиск по дате возврата

  const [sortCriteria, setSortCriteria] = useState<'name' | 'dueSoon' | 'maxPenalty'>('name'); // Критерий сортировки

  useEffect(() => {
    getProfileBooks(jwt, dispatch).then(data => {
      if (data !== undefined) setProfileBooks(data);
    });
    getProfilePenalty(jwt, dispatch).then(data => {
      if (data !== undefined) setPenalty(data);
    });
  }, [jwt]);

  const penaltyInfo = (val: ProfileBook): JSX.Element => {
    const index: number = penalty.findIndex((p) => p.id_book_reader === val.id_book_reader);
    if (index === -1) {
      return <></>;
    } else {
      return (
        <div>
          <p style={{ color: '#d9534f' }}>Просрочена сдача!</p>
          <p>Просрочено с {penalty[index].start_time}</p>
          <p>Штраф: {penalty[index].payment}р</p>
        </div>
      );
    }
  };

  // Фильтрация текущих и завершенных книг
  let currentBooks: ProfileBook[] = [];
  let completedBooks: ProfileBook[] = [];

  profileBooks.forEach((book) => {
    if (new Date(book.end_date) >= new Date() || penalty.findIndex((p) => p.id_book_reader === book.id_book_reader) !== -1) {
      currentBooks = [...currentBooks, book];
    } else {
      completedBooks = [...completedBooks, book];
    }
  });

  // Сортировка текущих заказов
  const sortBooks = (books: ProfileBook[]) => {
    return books.sort((a, b) => {
      if (sortCriteria === 'name') {
        // Лексикографическая сортировка по имени книги
        return a.book_name.localeCompare(b.book_name);
      } else if (sortCriteria === 'dueSoon') {
        // Сортировка по ближайшей дате возврата
        return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
      } else if (sortCriteria === 'maxPenalty') {
        // Сортировка по максимальному штрафу (если нет штрафа, то fallback к дате возврата)
        const penaltyA = penalty.find((p) => p.id_book_reader === a.id_book_reader)?.payment || 0;
        const penaltyB = penalty.find((p) => p.id_book_reader === b.id_book_reader)?.payment || 0;
        if (penaltyA !== penaltyB) {
          return penaltyB - penaltyA; // Максимальный штраф первее
        }
        return new Date(a.end_date).getTime() - new Date(b.end_date).getTime(); // Fallback к ближайшей дате
      }
      return 0;
    });
  };

  const sortedCurrentBooks = sortBooks(currentBooks);

  // Фильтрация завершенных книг по всем полям
  const filteredCompletedBooks = completedBooks.filter((book) => {
    const bookTitleMatch = (bookNameQuery === "" 
      || book.book_name.toLowerCase().startsWith(bookNameQuery.toLowerCase()));
    const borrowDateMatch = (borrowDateQuery === "" 
      || new Date(book.borrow_date) >= new Date(borrowDateQuery));
    const returnDateMatch = (returnDateQuery === "" 
      || new Date(book.end_date) <= new Date(returnDateQuery));
    return bookTitleMatch && borrowDateMatch && returnDateMatch;
  });

  return (
    <div className="profile-books-container">
      <LoadingWrapper dispatch={dispatch}>
        {/* Вкладки для переключения */}
        <div className="tabs">
          <button
            className={activeTab === 'current' ? 'active' : ''}
            onClick={() => setActiveTab('current')}
          >
            Текущие заказы ({currentBooks.length})
          </button>
          <button
            className={activeTab === 'completed' ? 'active' : ''}
            onClick={() => setActiveTab('completed')}
          >
            Завершенные заказы ({completedBooks.length})
          </button>
        </div>

        {/* Содержание вкладки */}
        {activeTab === 'current' ? (
          <div className="profile-books-list">
            <h2>Текущие заказы</h2>

            {/* Выбор критерия сортировки */}
            <div className="profile-sort-container">
              <label htmlFor="sortCriteria">Сортировать по:</label>
              <select
                id="sortCriteria"
                value={sortCriteria || ''}
                onChange={(e) => setSortCriteria(e.target.value as 'name' | 'dueSoon' | 'maxPenalty')}
              >
                <option value="name">Лексикографически по названию книги</option>
                <option value="dueSoon">Ближайшая дата возврата</option>
                <option value="maxPenalty">Максимальный штраф</option>
              </select>
            </div>

            {sortedCurrentBooks.length === 0 ? (
              <p className="profile-no-books">Нет текущих заказов.</p>
            ) : (
              sortedCurrentBooks.map((val) => (
                <div className="profile-book-item" key={val.id_book_reader}>
                  <p>
                    Название книги: <button className="profile-book-name">{val.book_name}</button>
                  </p>
                  <p>Дата взятия книги: {new Date(val.borrow_date).toLocaleString()}</p>
                  <p>Когда книгу нужно вернуть: {new Date(val.end_date).toLocaleString()}</p>
                  {penaltyInfo(val)}
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="profile-books-list">
            <h2>Завершенные заказы</h2>
            <div className="profile-search-container">
              <div className="profile-search-item">
                <label htmlFor="bookName" className='profile-label'>Название книги: </label>
                <input
                  type="text"
                  id="bookName"
                  placeholder="Введите название книги"
                  value={bookNameQuery}
                  onChange={(e) => setBookNameQuery(e.target.value)}
                  className="profile-search-input"
                />
              </div>

              <div className="profile-search-item" >
                <label htmlFor="borrowDate" className='profile-label'>Дата получения: </label>
                <input
                  type="date"
                  id="borrowDate"
                  placeholder="Выберите дату получения"
                  value={borrowDateQuery}
                  onChange={(e) => setBorrowDateQuery(e.target.value)}
                  className="profile-search-input"
                />
              </div>

              <div className="profile-search-item">
                <label htmlFor="returnDate" className='profile-label'>Дата возврата: </label>
                <input
                  type="date"
                  id="returnDate"
                  placeholder="Выберите дату возврата"
                  value={returnDateQuery}
                  onChange={(e) => setReturnDateQuery(e.target.value)}
                  className="profile-search-input"
                />
              </div>
            </div>

            {filteredCompletedBooks.length === 0 ? (
              <p className="profile-no-books">Нет завершенных заказов по вашему запросу.</p>
            ) : (
              filteredCompletedBooks.map((val) => (
                <div className="profile-book-item" key={val.id_book_reader}>
                  <p>
                    Название книги: <button className="profile-book-name">{val.book_name}</button>
                  </p>
                  <p>Дата взятия книги: {new Date(val.borrow_date).toLocaleString()}</p>
                  <p>Когда книгу была возвращена: {new Date(val.end_date).toLocaleString()}</p>
                  {penaltyInfo(val)}
                </div>
              ))
            )}
          </div>
        )}
      </LoadingWrapper>
    </div>
  );
};
