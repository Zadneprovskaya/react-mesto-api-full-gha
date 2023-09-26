class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  /* _checkResponse(res) {
    if (res.ok) {
      console.log(res);
      return res.json();
    } else {
      Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
    };
  }; */

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getUserData() {
    return this._request(this._userUrl, { 
      //headers: this._headers
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
  }

  saveUserChanges({ name, about }, token) {
    return this._request(this._userUrl, {
      method: 'PATCH',
      //headers: this._headers,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, about })
      /* body: JSON.stringify({
        name: name,
        about: about,
      }) */
    })
  }

  changedAvatar(src, token) {
    return this._request(`${this._userUrl}/avatar`, {
      method: 'PATCH',
      //headers: this._headers,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: src,
      })
    })
  }

  getInitialCards() {
    return this._request(this._cardsUrl, { 
      //headers: this._headers 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
  }

  postNewCard({ name, link }, token) {
    return this._request(this._cardsUrl, {
      method: 'POST',
      //headers: this._headers,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, link })
      /* body: JSON.stringify({
        name: name,
        link: link,
      }) */
    })
  }

  removeCard(cardId, token) {
    return this._request(`${this._cardsUrl}/${cardId}`, {
      method: 'DELETE',
      //headers: this._headers
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
  }

  likedCard(cardId, token) {
    return this._request(`${this._cardsUrl}/${cardId}/likes`, {
      method: 'PUT',
      //headers: this._headers
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
  }

  dislikedCard(cardId, token) {
    return this._request(`${this._cardsUrl}/${cardId}/likes`, {
      method: 'DELETE',
      //headers: this._headers
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
  }
}

const api = new Api({
  baseUrl: 'https://api.myeducateproject.nomoredomainsrocks.ru',
  /* headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  } */
});

export default api;


