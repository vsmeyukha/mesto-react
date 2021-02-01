class Api {
  constructor(apiKey, baseUrl) {
    this.headers = {
      authorization: apiKey
    };
    this.baseUrl = baseUrl
  }

  _getResponseData(url, method, headers, body) {
    return fetch(url, {
      method: method,
      headers: headers,
      body: body
    })
      .then(res => {
        if (res.ok) {
          return res.json();  
        } else {
          return Promise.reject();
        }
      });
  }

  getInitialCards() {
    return this._getResponseData(`${this.baseUrl}/cards`, 'GET', this.headers);
  }

  addNewCard(obj) {
    return this._getResponseData(`${this.baseUrl}/cards`, 'POST', { ...this.headers, 'Content-Type': 'application/json' }, JSON.stringify(obj));
  }

  deleteCard(id) {
    return this._getResponseData(`${this.baseUrl}/cards/${id}`, 'DELETE', this.headers);
  }

  getUserInfo() {
    return this._getResponseData(`${this.baseUrl}/users/me`, 'GET', this.headers);
  }
  
  getAllNeededData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  editProfile(obj) {
    return this._getResponseData(`${this.baseUrl}/users/me`, 'PATCH', { ...this.headers, 'Content-Type': 'application/json' }, JSON.stringify(obj));
  }

  changeAvatar(obj) {
    return this._getResponseData(`${this.baseUrl}/users/me/avatar`, 'PATCH', { ...this.headers, 'Content-Type': 'application/json' }, JSON.stringify(obj));
  }

  addALike(id) {
    return this._getResponseData(`${this.baseUrl}/cards/likes/${id}`, 'PUT', this.headers);
  }

  deleteLike(id) {
    return this._getResponseData(`${this.baseUrl}/cards/likes/${id}`, 'DELETE', this.headers);
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.addALike(id);
    }
    else {
      return this.deleteLike(id);
    }

  }
}

const api = new Api('2dbd0122-ea43-4557-862d-f5c5a66a918e', 'https://mesto.nomoreparties.co/v1/cohort-18');
export default api;