import { useState } from "react";
import UserForm from "./UserForm";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/Auth.js";

export default function Login({ onSuccess, onLogin, onFail }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValue.email || !formValue.password) return;

    try {
      const data = await auth.authorize(formValue.email, formValue.password);

      if (!data.token) {
        throw new Error("Сервер не вернул данные");
      }
      setFormValue({ email: "", password: "" });
      onLogin();
      onSuccess();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Ошибка входа:", err);
      onFail();
    }
  };
  return (
    <UserForm title="Вход" buttonTitle="Войти" onSubmit={handleSubmit}>
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
            value={formValue.email}
            onChange={handleChange}
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
            value={formValue.password}
            onChange={handleChange}
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
