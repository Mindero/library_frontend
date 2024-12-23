import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import LoginForm from './LoginForm';
import { useDispatch } from 'react-redux';
import { setIsAuth, setJwt, setRole } from '../../reducer/userStore';
import { postLoginForm } from './LoginService';
import { LoadingWrapper } from '../LoadingWrapper/settingsLoading';


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
        const data = await postLoginForm(form, dispatch);
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <LoadingWrapper dispatch={dispatch}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '20px'
        }}>
          Логин
        </h2>
        <div style={{
          marginBottom: '10px',
          width: '300px',
          textAlign: 'left'
        }}>
          <p style={{ marginBottom: '5px' }}>Почта</p>
          <input
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
            name="username"
            type="text"
            value={form['username']}
            onChange={onChange}
          />
        </div>
        <div style={{
          marginBottom: '10px',
          width: '300px',
          textAlign: 'left'
        }}>
          <p style={{ marginBottom: '5px' }}>Пароль</p>
          <input
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
            name="password"
            type="password"
            value={form['password']}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          onClick={submitLogin}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
        >
          Войти
        </button>
        {loginInfo && (
          <div style={{
            marginTop: '10px',
            color: loginInfo.includes('неправильно') ? 'red' : 'green'
          }}>
            {loginInfo}
          </div>
        )}
      </LoadingWrapper>
    </div>
  );
}