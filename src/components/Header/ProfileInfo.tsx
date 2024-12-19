import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../ui/Header.css'

export const ProfileInfo = () => {
  const navigate = useNavigate()

  const toProfile = () => navigate("/profile")

  return (
    <div>
      <button className = "auth-button login-button" type = "button" onClick={toProfile}> My profile </button>
    </div>
  )
}