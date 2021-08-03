class MainApi {
  constructor({ url }) {
    this.url = url;
  }

  _processingResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка, код ${res.status}`))
  }

  signUp({ email, name, password }) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    })
      .then(res => this._processingResponse(res));
  }

  signIn({ email, password }) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(res => this._processingResponse(res));
  }

  getUser(jwt) {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`,
      },
    })
      .then(res => this._processingResponse(res));
  }

  updateUser({ userData, jwt}) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email
      }),
    })
    .then(res => this._processingResponse(res));
  }
}

const mainApi = new MainApi({
  // url: 'http://api.moviest.nomoredomains.monster',
  url: 'http://localhost:3000',
});

export default mainApi;
