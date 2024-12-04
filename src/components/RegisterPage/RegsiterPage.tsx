import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import RegisterForm, {filterForm} from './RegisterForm'
import {postRegisterForm} from './RegisterService'
import { useDispatch } from 'react-redux';
import { setIsAuth, setJwt } from '../../reducer/userStore';

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
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

  const inputFields = (form : RegisterForm) : JSX.Element[] => {
    return Object.keys(form).map((field) => (
        <div>
          <p>{field}</p>
          <input
            className={field}
            name={field}
            type="text"
            value={form[field as keyof RegisterForm]}
            onChange={onChange}
          />
        </div>
      ))
  }

  const submitRegister = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const wrongField : string | null = filterForm(form, (val : string) => val.length == 0);
    console.log(form, wrongField);
    if (wrongField !== null){
      setIncorrectField(wrongField);
    }
    else{
      try{
        const data = await postRegisterForm(form);
        dispatch(setJwt(data));
        console.log(data);
      } catch(error){
        console.log(error);
      } finally{
        console.log("Success register");
      }
    }
  }

  return (
    <div>
      <h2>RegisterPage</h2>
      {inputFields(form)}
      <button type="submit" onClick={submitRegister}>
          Register
      </button>
      {(incorrectField === undefined)? 
      <></>:
      <div>
        {`Неправильно введено поле ${incorrectField}`}
      </div>
      }
    </div>
  );
}