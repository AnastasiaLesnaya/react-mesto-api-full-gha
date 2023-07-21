class AuthApi {
  constructor(address) {
    this._authUrl = address;
  }
  // функция обработки ответа сервера
  _handleRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Код ошибки: ${res.status}`);
  }

  // функция отправки запроса на сервер
  _request(link, authUrl) {
    return fetch(link, authUrl)
    .then(this._handleRes);
  }

  // метод верификации токена
  tokenCheck (token) {
    return this._request(`${this._authUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization : `Bearer ${ token }`
      },
    })
  }

  // метод регистрации пользователя
   userReg (email, password) {
    return this._request(`${this._authUrl}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email })
    })
  }

  // метод авторизации пользователя
  userLog (email, password) {
    return this._request(`${this._authUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email })
    })
    .then((userData) => {
      if (userData.token) { localStorage.setItem('token', userData.token) }
    })
  }
}

const apiAuth = new AuthApi('https://api.mestolesnoy.nomoredomains.work');

export default apiAuth;