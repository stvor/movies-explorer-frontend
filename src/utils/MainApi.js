import { BEATFILM_URL } from '../utils/constants';

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

  getSavedMovies(jwt) {
    return fetch(`${this.url}/movies`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`,
      },
    })
      .then(res => this._processingResponse(res));
  }

  saveMovie({ movie, jwt }) {
    return fetch(`${this.url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${BEATFILM_URL}${movie.image.url}`,
        trailer: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `${BEATFILM_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      }),
    })
    .then(res => this._processingResponse(res));
  }

  deleteMovie({ movie, jwt }) {
    return fetch(`${this.url}/movies/${movie._id}`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${jwt}`,
      },
    })
    .then(res => this._processingResponse(res));
  }
}

const mainApi = new MainApi({
  url: 'http://api.moviest.nomoredomains.monster',
});

export default mainApi;
