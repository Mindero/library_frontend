import React, { useEffect, useState } from 'react';
import { getProfileInfo } from './ProfileService';
import { useSelector } from 'react-redux';
import { userJwtSelector } from '../../reducer/userStore/reducer';
import ProfileForm from './ProfileForm';
import { ProfileInfo } from './ProfileInfo';
import { Navigate } from 'react-router-dom';
import { ProfileBooks } from './ProfileBooks';

export const ProfilePage = () => {

  const [profile, setProfile] = useState<ProfileForm | null>(null);
  const NullableJwt: string | null= useSelector(userJwtSelector);
  if (NullableJwt === null){
    <Navigate to ="/"/>
  }
  const jwt = String(NullableJwt);
  return (
    <div>
      <ProfileInfo jwt = {jwt}/>
      <ProfileBooks jwt = {jwt}/>
    </div>
  )
}