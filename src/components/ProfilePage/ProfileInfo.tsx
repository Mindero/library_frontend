import React, { useEffect, useState } from 'react';
import { getProfileInfo } from './ProfileService';
import { useDispatch, useSelector } from 'react-redux';
import { userJwtSelector } from '../../reducer/userStore/reducer';
import ProfileForm from './ProfileForm';
import { LoadingWrapper } from '../LoadingWrapper/settingsLoading';
import { AppDispatch } from '../../store';
import '../ui/ProfileInfo.css';

export const ProfileInfo = ({jwt, dispatch} : {jwt : string, dispatch : AppDispatch}) => {

  const [profile, setProfile] = useState<ProfileForm | null>(null);

  useEffect(() => {
    getProfileInfo(jwt, dispatch).then(profile => {
      if (profile !== undefined) setProfile(profile);
    })
  }, []);

  return (
    <div className="profile-info-container">
      <LoadingWrapper dispatch={dispatch}>
        <div className="profile-info">
          <h2>Profile Info</h2>
          {profile ? (
            <div className="profile-details">
              <p><span className="label">Name:</span> {profile.name}</p>
              <p><span className="label">Email:</span> {profile.email}</p>
              <p><span className="label">Phone number:</span> {profile.phone_number}</p>
              <p><span className="label">Created date:</span> {profile.created_date.toLocaleString()}</p>
            </div>
          ) : (
            <p className="no-profile">No profile information available.</p>
          )}
        </div>
      </LoadingWrapper>
    </div>
  )
}