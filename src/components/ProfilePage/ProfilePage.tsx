import React from 'react';
import { useParams } from 'react-router-dom';
import { getProfileInfo } from './ProfileService';
import { useSelector } from 'react-redux';
import { userJwtSelector } from '../../reducer/userStore/reducer';

export const ProfilePage = () => {
  getProfileInfo(useSelector(userJwtSelector)).then(profile => {
    console.log(profile);
    return (
      <div>
        Profile info
      </div>
    )
  });
}