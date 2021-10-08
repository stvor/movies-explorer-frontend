import { BEATFILM_URL } from '../utils/constants';

class MoviesApi {
  constructor({ url }) {
    this.url = url;
  }

  _processingResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка, код ${res.status}`))
  }

  getMovies() {
    return fetch(`${this.url}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => this._processingResponse(res));
  }
}

const moviesApi = new MoviesApi({
  url: `${BEATFILM_URL}/beatfilm-movies`,
});

export default moviesApi;
