import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import RegisterForm, {filterForm} from './RegisterForm'
import {postRegisterForm} from './RegisterService'
import { useDispatch } from 'react-redux';
import { LoadingWrapper } from '../LoadingWrapper/settingsLoading';

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    phone_number: '',
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

  const submitRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const wrongField : string | null = filterForm(form, (val : string) => val.length == 0);
    console.log(form, wrongField);
    if (wrongField !== null){
      setIncorrectField(`Неправильно введено поле ${wrongField}`);
    }
    else{
        postRegisterForm(form, dispatch).then((data) => {
          if (data !== undefined){
            console.log("Success register");
            setIncorrectField("Регистрация успешна");
          }
        });
    }
  }

  return (
    <LoadingWrapper dispatch={dispatch}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '20px'
        }}>
          Регистрация
        </h2>
        <div style={{
          marginBottom: '10px',
          width: '100%'
        }}>
          <p style={{ marginBottom: '5px' }}>Имя</p>
          <input
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
            name="name"
            type="text"
            value={form['name']}
            onChange={onChange}
          />
        </div>
        <div style={{
          marginBottom: '10px',
          width: '100%'
        }}>
          <p style={{ marginBottom: '5px' }}>Почта</p>
          <input
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
            name="email"
            type="text"
            value={form['email']}
            onChange={onChange}
          />
        </div>
        <div style={{
          marginBottom: '10px',
          width: '100%'
        }}>
          <p style={{ marginBottom: '5px' }}>Номер телефона</p>
          <input
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
            name="phone_number"
            type="text"
            value={form['phone_number']}
            onChange={onChange}
          />
        </div>
        <div style={{
          marginBottom: '10px',
          width: '100%'
        }}>
          <p style={{ marginBottom: '5px' }}>Пароль</p>
          <input
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
            name="password"
            type="text"
            value={form['password']}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          onClick={submitRegister}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007BFF')}
        >
          Зарегестрироваться
        </button>
        {incorrectField && (
          <div style={{
            marginTop: '10px',
            color: incorrectField.includes('Неправильно') ? 'red' : 'green'
          }}>
            {incorrectField}
          </div>
        )}
      </div>
    </LoadingWrapper>
  );
}