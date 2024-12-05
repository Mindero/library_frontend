import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import RegisterForm, {filterForm} from './RegisterForm'
import {postRegisterForm} from './RegisterService'

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    phone_number: '',
  });

  const [incorrectField, setIncorrectField] = useState<string>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Обновляем состояние через копирование объекта
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value, // Обновляем поле по имени
    }));
  };

  const submitRegister = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const wrongField : string | null = filterForm(form, (val : string) => val.length == 0);
    console.log(form, wrongField);
    if (wrongField !== null){
      setIncorrectField(`Неправильно введено поле ${wrongField}`);
    }
    else{
      try{
        const data = await postRegisterForm(form);
        console.log("Success register");
        setIncorrectField("Регистрация успешна");
      } catch(error){
        console.log(error);
      }
    }
  }

  return (
    <div>
      <h2>RegisterPage</h2>
      <div className='inputForm'>
          <p>Name</p>
          <input
            className='name'
            name='name'
            type="text"
            value={form['name']}
            onChange={onChange}
          />
      </div>
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
          <p>Phone number</p>
          <input
            className='phone_number'
            name='phone_number'
            type="text"
            value={form['phone_number']}
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
      <button type="submit" onClick={submitRegister}>
          Register
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