import React, { ChangeEvent } from "react";
import { useState } from "react";
import LoginForm from "./LoginForm";
import { useDispatch } from "react-redux";
import { setIsAuth, setJwt, setRole } from "../../reducer/userStore";
import { LoginResponse, postLoginForm } from "./LoginService";
import { LoadingWrapper } from "../LoadingWrapper/settingsLoading";
import { useNavigate } from "react-router-dom";
import "../ui/LoginPage.css";

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
    role: "",
  });

  const [loginInfo, setloginInfo] = useState<string>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const submitLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const wrongField: string | null =
      form.username.length === 0
        ? "почта"
        : form.password.length === 0
        ? "пароль"
        : null;

    if (wrongField !== null) {
      setloginInfo(`Неправильно введено поле ${wrongField}`);
    } else {
      const data : LoginResponse | void = await postLoginForm(form, dispatch);
      if (data !== undefined){
        dispatch(setJwt(data.access_token));
        dispatch(setIsAuth(true));
        dispatch(setRole(data.role));
        setloginInfo("Логин успешен");
        navigate("/profile");
      }
    }
  };

  return (
    <div className="loginPage_container">
      <LoadingWrapper dispatch={dispatch}>
        <h2 className="loginPage_title">Логин</h2>
        <div className="loginPage_inputGroup">
          <p className="loginPage_label">Почта</p>
          <input
            className="loginPage_input"
            name="username"
            type="text"
            value={form["username"]}
            onChange={onChange}
          />
        </div>
        <div className="loginPage_inputGroup">
          <p className="loginPage_label">Пароль</p>
          <input
            className="loginPage_input"
            name="password"
            type="password"
            value={form["password"]}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          onClick={submitLogin}
          className="loginPage_button"
        >
          Войти
        </button>
        {loginInfo && (
          <div
            className={`loginPage_message ${
              loginInfo.includes("неправильно")
                ? "loginPage_errorMessage"
                : "loginPage_successMessage"
            }`}
          >
            {loginInfo}
          </div>
        )}
      </LoadingWrapper>
    </div>
  );
}
