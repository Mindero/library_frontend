import React from 'react';
import {Link, useNavigate} from 'react-router-dom'

export const AuthContainer = () =>{
  const navigate = useNavigate()

  const navHandler = (path: string) => {
    navigate(path)
  }

  return (
    <div>
      <button onClick={() => navHandler("/login")}> Login </button>
      <button onClick={() => navHandler("/register")}> Register </button>
    </div>
  );
}