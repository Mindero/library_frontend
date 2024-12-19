import React, { useEffect, useState } from 'react';
import { getProfileBooks, getProfileInfo, ProfileBook } from './ProfileService';
import { useDispatch, useSelector } from 'react-redux';
import { userJwtSelector } from '../../reducer/userStore/reducer';
import ProfileForm from './ProfileForm';
import { LoadingWrapper } from '../LoadingWrapper/settingsLoading';
import { AppDispatch } from '../../store';

export const ProfileBooks = ({jwt, dispatch} : {jwt : string, dispatch: AppDispatch}) => {
  const [profileBooks, setProfileBooks] = useState<ProfileBook[]>([]);
  useEffect(() => {
    getProfileBooks(jwt, dispatch).then(data => {
      if (data !== undefined)
        setProfileBooks(data);
    })
  }, [jwt])
  return (
    <div>
      <LoadingWrapper dispatch={dispatch}>
        {profileBooks.length === 0?
          (<></>) :(
            <div> 
            <p> Взятые книги </p>
            {profileBooks.map((val) => {
              return <div>
                  <p>Название книги: <button>{val.book_name}</button></p>
                  <p>Дата взятия книги: {val.borrow_date.toLocaleString()}</p>
                  <p>Когда книгу нужно вернуть: {val.end_date.toLocaleString()}</p>
                </div>
            })}
            </div>
          )}
      </LoadingWrapper>
    </div>
  )
}