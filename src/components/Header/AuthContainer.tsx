import React from 'react';
import {Link} from 'react-router-dom'

export const AuthContainer = () =>{
  return (
    <div>
      <Link to="/login"> Login </Link>
      <Link to="/register"> Register </Link>
    </div>
  );
}