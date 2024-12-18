import React, { useEffect, useState } from 'react';
import { getProfileBooks, getProfileInfo, ProfileBook } from './ProfileService';
import { useSelector } from 'react-redux';
import { userJwtSelector } from '../../reducer/userStore/reducer';
import ProfileForm from './ProfileForm';

export const ProfileBooks = ({jwt} : {jwt : string}) => {
  const [profileBooks, setProfileBooks] = useState<ProfileBook[]>([]);

  useEffect(() => {
    try{
      getProfileBooks(jwt).then(data => {
        setProfileBooks(data);
      })
    }
    catch(error){
      console.log("Error with getting profile books " + error);
    }
  }, [jwt])
  return (
    <div>
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
    </div>
  )
}