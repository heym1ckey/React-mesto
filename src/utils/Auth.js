export const BASE_URL = "https://auth.nomoreparties.co";

export const register = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return await response.json();
    }

    throw new Error(`Ошибка регистрации: ${response.status}`);
  } catch (err) {
    console.error("Ошибка в register:", err);
    throw err;
  }
};

export const authorize = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("jwt", data.token);
      }
      return data;
    }

    throw new Error(`Ошибка входа: ${response.status}`);
  } catch (err) {
    console.error("Ошибка в login:", err);
    throw err;
  }
};

export const checkToken = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error(`Ошибка проверки: ${response.status}`);
  } catch (err) {
    console.error("Ошибка в checkToken:", err);
    throw err;
  }
};
