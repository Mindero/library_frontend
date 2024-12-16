import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ProfileInfo = () => {
  const navigate = useNavigate()

  const toProfile = () => navigate("/profile")

  return (
    <div>
      <button type = "button" onClick={toProfile}> My profile </button>
    </div>
  )
}