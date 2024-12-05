import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import LoginForm from './LoginForm';
import { useDispatch } from 'react-redux';
import { setIsAuth, setJwt } from '../../reducer/userStore';
import { userJwtSelector } from '../../reducer/userStore/reducer';
import { useSelector } from 'react-redux';
import { postLoginForm } from './LoginService';


export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [incorrectField, setIncorrectField] = useState<string>();

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
      (form.email.length === 0) ? form.email
      : (form.password.length === 0) ? form.password
      : null;
    console.log(form, wrongField);
    if (wrongField !== null){
      setIncorrectField(`Неправильно введено поле ${wrongField}`);
    }
    else{
      try{
        const data = await postLoginForm(form);
        dispatch(setJwt(data.access_token));
        dispatch(setIsAuth(true));
        console.log("Success login");
        setIncorrectField("Логин успешен");
      } catch(error){
        console.log(error);
      }
    }
  }

  return (
    <div>
      <h2>RegisterPage</h2>
      <div className='inputForm'>
          <p>email</p>
          <input
            className='email'
            name='email'
            type="text"
            value={form['email']}
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
      {(incorrectField === undefined)? 
      <></>:
      <div>
        {incorrectField}
      </div>
      }
    </div>
  );
}