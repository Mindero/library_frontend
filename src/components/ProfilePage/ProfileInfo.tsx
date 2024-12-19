import React, { useEffect, useState } from 'react';
import { getProfileInfo } from './ProfileService';
import { useDispatch, useSelector } from 'react-redux';
import { userJwtSelector } from '../../reducer/userStore/reducer';
import ProfileForm from './ProfileForm';
import { LoadingWrapper } from '../LoadingWrapper/settingsLoading';
import { AppDispatch } from '../../store';

export const ProfileInfo = ({jwt, dispatch} : {jwt : string, dispatch : AppDispatch}) => {

  const [profile, setProfile] = useState<ProfileForm | null>(null);

  useEffect(() => {
    getProfileInfo(jwt, dispatch).then(profile => {
      if (profile !== undefined) setProfile(profile);
    })
  }, []);

  return (
    <div>
      <LoadingWrapper dispatch={dispatch}>
        Profile info
        <p>Name: {profile?.name} </p>
        <p>Email: {profile?.email} </p>
        <p>Phone number: {profile?.phone_number} </p>
        <p>Created date: {profile?.created_date.toLocaleString()} </p>
      </LoadingWrapper>
    </div>
  )
}