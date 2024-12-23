import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import '../ui/Header.css'

export const AuthContainer = () =>{
  const navigate = useNavigate()

  const navHandler = (path: string) => {
    navigate(path)
  }

  return (
    <div className="auth-container">
      <button className="auth-button login-button" onClick={() => navHandler("/login")}>Логин</button>
      <button className="auth-button register-button" onClick={() => navHandler("/register")}>Регистрация</button>
    </div>
  );
}