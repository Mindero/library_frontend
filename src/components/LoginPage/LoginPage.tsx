import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import LoginForm from './LoginForm';
import { useDispatch } from 'react-redux';
import { setIsAuth, setJwt, setRole } from '../../reducer/userStore';
import { postLoginForm } from './LoginService';


export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({
    username: '',
    password: '',
    role: '',
  });

  const [loginInfo, setloginInfo] = useState<string>();

  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Обновляем состояние через копирование объекта
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value, // Обновляем поле по имени
    }));
  };

  const submitLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const wrongField : string | null =
      (form.username.length === 0) ? form.username
      : (form.password.length === 0) ? form.password
      : null;
    console.log(form, wrongField);
    if (wrongField !== null){
      setloginInfo(`Неправильно введено поле ${wrongField}`);
    }
    else{
      try{
        const data = await postLoginForm(form);
        dispatch(setJwt(data.access_token));
        dispatch(setIsAuth(true));
        dispatch(setRole(data.role))
        console.log("Success login");
        setloginInfo("Логин успешен");
      } catch(error){
        console.log(error);
      }
    }
  }

  return (
    <div>
      <h2>LoginPage</h2>
      <div className='inputForm'>
          <p>email</p>
          <input
            className='username'
            name='username'
            type="text"
            value={form['username']}
            onChange={onChange}
          />
      </div>
      <div className='inputForm'>
          <p>password</p>
          <input
            className='password'
            name='password'
            type="text"
            value={form['password']}
            onChange={onChange}
          />
      </div>
      <button type="submit" onClick={submitLogin}>
          Login
      </button>
      {(loginInfo === undefined)? 
      <></>:
      <div>
        {loginInfo}
      </div>
      }
    </div>
  );
}