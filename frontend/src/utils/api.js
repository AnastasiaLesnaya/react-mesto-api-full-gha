class Api {
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
  // загрузка карточек с сервера
  getAllCards() {
    return this._request(`${this._authUrl}/cards`, {
      method: "GET",
      headers: {
      'Content-Type': 'application/json',
      authorization : `Bearer ${ localStorage.getItem('token') }`
    },
    });
  }

  // загрузка данных профиля с сервера
  getUserInfo() {
    return this._request(`${this._authUrl}/users/me`, {
      method: "GET",
      headers: {
      'Content-Type': 'application/json',
      authorization : `Bearer ${ localStorage.getItem('token') }`
    },
    });
  }

  // отправка обновлённых данных пользователя
  setUserInfo(userName, userDescription) {
    return this._request(`${this._authUrl}/users/me`, {
      method: "PATCH",
      headers: {
      'Content-Type': 'application/json',
      authorization : `Bearer ${ localStorage.getItem('token') }`
    },
    body: JSON.stringify({
      name: userName, about: userDescription
    }),
    });
  }

  // отправка аватара пользователя
  setAvatar(ava) {
    return this._request(`${this._authUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
      'Content-Type': 'application/json',
      authorization : `Bearer ${ localStorage.getItem('token') }`
      },
      body: JSON.stringify({
        avatar: ava.avatar,
      }),
    });
   }

  // отправка новой карточки на сервер
  addNewCard(name, link) {
    return this._request(`${this._authUrl}/cards`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      authorization : `Bearer ${ localStorage.getItem('token') }`
      },
      body: JSON.stringify({
      name, link
      }),
    });
  }
  
  // удаление карточки с сервера
  deleteCard(cardId) {
    return this._request(`${this._authUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json',
      authorization : `Bearer ${ localStorage.getItem('token') }`
      },
      });
    }

  // отправка/снятие лайка на сервере
  changeLikeCardStatus(cardId, isLiked) {
    const method1 = isLiked ? 'PUT' : 'DELETE';
    return this._request(`${this._authUrl}/cards/${cardId}/likes`, {
      method: method1,
      headers: {
      'Content-Type': 'application/json',
      authorization : `Bearer ${ localStorage.getItem('token') }`
      },
    });
  }
}
// API
const api = new Api('https://api.mestolesnoy.nomoredomains.work');

export default api;