import { useEffect, useState } from 'react';
import { getProfileInfo } from './ProfileService';
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
          <h2>Информация о профиле</h2>
          {profile ? (
            <div className="profile-details">
              <p><span className="label">Имя:</span> {profile.name}</p>
              <p><span className="label">Почта:</span> {profile.email}</p>
              <p><span className="label">Номер телефона:</span> {profile.phone_number}</p>
              <p><span className="label">Дата создания профиля:</span> {profile.created_date.toLocaleString()}</p>
              <p> <span className='label'>Сумма долга</span> {profile.sum_payment} </p>
              <p> <span className='label'>Кол-во задолженных книг</span> {profile.cnt_payment} </p>
            </div>
          ) : (
            <p className="no-profile">Нет информации о профиле</p>
          )}
        </div>
      </LoadingWrapper>
    </div>
  )
}