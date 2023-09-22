
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._likesUrl = `${this._baseUrl}/cards/likes`;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getUserData() {
    return this._request(this._userUrl, { headers: this._headers })
  }

  saveUserChanges({ name, about }) {
    return this._request(this._userUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
  }

  changedAvatar(src) {
    return this._request(`${this._userUrl}/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: src,
      })
    })
  }

  getInitialCards() {
    return this._request(this._cardsUrl, { headers: this._headers })
  }

  postNewCard({ name, link }) {
    return this._request(this._cardsUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
  }

  removeCard(cardId) {
    return this._request(`${this._cardsUrl}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  likedCard(cardId) {
    return this._request(`${this._likesUrl}/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
  }

  dislikedCard(cardId) {
    return this._request(`${this._likesUrl}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }
}

const api = new Api({
  /* baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: 'a1f9f0af-27ca-45f0-9642-1f29074bddcb',
    'Content-Type': 'application/json'
  } */
  baseUrl: 'https://api.myeducateproject.nomoredomainsrocks.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;


