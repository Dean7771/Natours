import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:4000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Успешная авторизация.');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:4000/api/v1/users/logout',
    });

    if ((res.data.status = 'success')) {
      location.reload(true);
      location.assign('/login');
    }
  } catch (err) {
    showAlert('error', 'Произошла ошибка при выходе, повторите попытку.');
  }
};
