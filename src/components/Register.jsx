import { useState } from "react";
import UserForm from "./UserForm";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/Auth.js";

export default function Register({ onSuccess, onFail }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await auth.register(formValue.email, formValue.password);

      if (!data) {
        throw new Error("Сервер не вернул данные");
      }

      onSuccess(e);
      navigate("/sign-in", { replace: true });
    } catch (err) {
      console.error("Ошибка регистрации:", err);
      onFail();
    }
  };

  return (
    <UserForm title="Регистрация" buttonTitle="Зарегистрироваться" showLink={true} onSubmit={handleSubmit}>
      <div className="userform__inputs">
        <div>
          <input
            id="input-email"
            name="email"
            className="userform__input userform__input-email"
            type="email"
            minLength="2"
            maxLength="40"
            placeholder="Email"
            required
            onChange={handleChange}
            value={formValue.email}
          />
          <span className="userform__input-error input-name-error"></span>
        </div>
        <div>
          <input
            id="input-password"
            name="password"
            className="userform__input userform__input-password"
            type={showPassword ? "text" : "password"}
            minLength="2"
            maxLength="200"
            placeholder="Пароль"
            onChange={handleChange}
            value={formValue.password}
            required
          />
          <label className="userform__checkbox">
            <input
              className="userform__checkbox-input"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Показать пароль
          </label>
          <span className="popup__input-error input-activity-error"></span>
        </div>
      </div>
    </UserForm>
  );
}
