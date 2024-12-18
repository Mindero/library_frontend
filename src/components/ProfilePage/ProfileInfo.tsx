import React, { useEffect, useState } from 'react';
import { getProfileInfo } from './ProfileService';
import { useSelector } from 'react-redux';
import { userJwtSelector } from '../../reducer/userStore/reducer';
import ProfileForm from './ProfileForm';

export const ProfileInfo = ({jwt} : {jwt : string}) => {

  const [profile, setProfile] = useState<ProfileForm | null>(null);

  useEffect(() => {
    getProfileInfo(jwt).then(profile => {
      setProfile(profile);
    })
  }, []);

  return (
    <div>
        Profile info
        <p>Name: {profile?.name} </p>
        <p>Email: {profile?.email} </p>
        <p>Phone number: {profile?.phone_number} </p>
        <p>Created date: {profile?.created_date.toLocaleString()} </p>
    </div>
  )
}