import React, { ChangeEvent } from "react";
import { useState } from "react";
import RegisterForm, { filterForm } from "./RegisterForm";
import { postRegisterForm } from "./RegisterService";
import { useDispatch } from "react-redux";
import { LoadingWrapper } from "../LoadingWrapper/settingsLoading";
import "../ui/RegisterPage.css";

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    phone_number: "",
  });

  const [incorrectField, setIncorrectField] = useState<string>();
  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const submitRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const wrongField: string | null = filterForm(form, (val: string) => val.length === 0);
    console.log(form, wrongField);
    if (wrongField !== null) {
      setIncorrectField(`Неправильно введено поле ${wrongField}`);
    } else {
      postRegisterForm(form, dispatch).then((data) => {
        if (data !== undefined) {
          console.log("Success register");
          setIncorrectField("Регистрация успешна");
        }
      });
    }
  };

  return (
    <LoadingWrapper dispatch={dispatch}>
      <div className="registerPage_container">
        <h2 className="registerPage_title">Регистрация</h2>
        <div className="registerPage_field">
          <p className="registerPage_label">Имя</p>
          <input
            className="registerPage_input"
            name="name"
            type="text"
            value={form["name"]}
            onChange={onChange}
          />
        </div>
        <div className="registerPage_field">
          <p className="registerPage_label">Почта</p>
          <input
            className="registerPage_input"
            name="email"
            type="text"
            value={form["email"]}
            onChange={onChange}
          />
        </div>
        <div className="registerPage_field">
          <p className="registerPage_label">Номер телефона</p>
          <input
            className="registerPage_input"
            name="phone_number"
            type="text"
            value={form["phone_number"]}
            onChange={onChange}
          />
        </div>
        <div className="registerPage_field">
          <p className="registerPage_label">Пароль</p>
          <input
            className="registerPage_input"
            name="password"
            type="text"
            value={form["password"]}
            onChange={onChange}
          />
        </div>
        <button
          className="registerPage_submitButton"
          type="submit"
          onClick={submitRegister}
        >
          Зарегестрироваться
        </button>
        {incorrectField && (
          <div
            className={`registerPage_message ${
              incorrectField.includes("Неправильно")
                ? "registerPage_error"
                : "registerPage_success"
            }`}
          >
            {incorrectField}
          </div>
        )}
      </div>
    </LoadingWrapper>
  );
}
