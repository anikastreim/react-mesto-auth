class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _checkHeaders() {
    return {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json",
    };
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._checkHeaders(),
    })
    .then(this._checkResponse);
  }

  getInitialUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._checkHeaders(),
    })
    .then(this._checkResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._checkHeaders(),
      body: JSON.stringify({ name, about })
    })
    .then(this._checkResponse);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._checkHeaders(),
      body: JSON.stringify({ name, link })
    })
    .then(this._checkResponse);
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._checkHeaders(),
      body: JSON.stringify({ avatar: avatar.avatar })
    })
    .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._checkHeaders(),
    })
    .then(this._checkResponse);
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._checkHeaders(),
    })
    .then(this._checkResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._checkHeaders(),
    })
    .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.putLike(cardId)
    } else {
      return this.deleteLike(cardId)
    }
  }
}

export const api = new Api({
  baseUrl: "https://api.mesto.anikastreim.nomoredomains.xyz",
});