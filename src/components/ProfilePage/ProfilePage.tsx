import React, { useEffect, useState } from 'react';
import { getProfileInfo } from './ProfileService';
import { useDispatch, useSelector } from 'react-redux';
import { userJwtSelector, userRoleSelector } from '../../reducer/userStore/reducer';
import ProfileForm from './ProfileForm';
import { ProfileInfo } from './ProfileInfo';
import { Navigate, useNavigate } from 'react-router-dom';
import { ProfileBooks } from './ProfileBooks';
import { Role } from '../../util/roles';
import { AdminRights } from './AdminRights';

export const ProfilePage = () => {

  const [profile, setProfile] = useState<ProfileForm | null>(null);
  const NullableJwt: string | null = useSelector(userJwtSelector);
  const role: string | null = useSelector(userRoleSelector);
  const dispatch = useDispatch();
  // console.log("Role: " + role);
  const navigate = useNavigate();
  if (NullableJwt === null){
    navigate("/");
  }
  const jwt = String(NullableJwt);
  return (
    <div>
      <ProfileInfo jwt = {jwt} dispatch={dispatch}/>
      {(role === Role[Role.ADMIN]) ? (
        <AdminRights/>
      ): (
        <div>
          <ProfileBooks jwt = {jwt} dispatch={dispatch}/>
        </div>
      )}
    </div>
  )
}