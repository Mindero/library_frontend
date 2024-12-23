import React, { useEffect, useState } from 'react';
import { getProfileBooks, getProfileInfo, getProfilePenalty, Penalty, ProfileBook } from './ProfileService';
import { useDispatch, useSelector } from 'react-redux';
import { userJwtSelector } from '../../reducer/userStore/reducer';
import ProfileForm from './ProfileForm';
import { LoadingWrapper } from '../LoadingWrapper/settingsLoading';
import { AppDispatch } from '../../store';
import '../ui/ProfileBooks.css';

export const ProfileBooks = ({jwt, dispatch} : {jwt : string, dispatch: AppDispatch}) => {
  const [profileBooks, setProfileBooks] = useState<ProfileBook[]>([]);
  const [penalty, setPenalty] = useState<Penalty[]>([]);
  useEffect(() => {
    getProfileBooks(jwt, dispatch).then(data => {
      if (data !== undefined)
        setProfileBooks(data);
    })
    getProfilePenalty(jwt, dispatch).then(data => {
      if (data !== undefined)
        setPenalty(data);
    });
  }, [jwt])

  const penaltyInfo = (val : ProfileBook) : JSX.Element => {
    const index : number = penalty.findIndex((p) => p.id_book_reader == val.id_book_reader);
    if (index === -1){
      return <></>
    }
    else{
      console.log(penalty[index])
      return (
      <div>
        <p  style={{color: '#d9534f'}}> Просрочена сдача! </p>
        <p> Просрочено с {penalty[index].start_time} </p>
        <p> Штраф: {penalty[index].payment}р</p>
      </div>)
    }
  }
  return (
    <div className="profile-books-container">
    <LoadingWrapper dispatch={dispatch}>
      {profileBooks.length === 0 ? (
        <p className="no-books">Нет взятых книг.</p>
      ) : (
        <div className="books-list">
          <h2>Взятые книги</h2>
          {profileBooks.map((val) => {
            return (
              <div className="book-item" key={val.id_book_reader}>
                <p>
                  Название книги: <button className="book-name">{val.book_name}</button>
                </p>
                <p>Дата взятия книги: {val.borrow_date.toLocaleString()}</p>
                <p>Когда книгу нужно вернуть: {val.end_date.toLocaleString()}</p>
                {penaltyInfo(val)}
              </div>
            );
          })}
        </div>
      )}
    </LoadingWrapper>
  </div>
  )
}