class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      console.log("MainApi: Ответ получен");
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${this.getToken()}`
      },
    }).then(this._checkResponse);
  }

  patchUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${this.getToken()}`
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${this.getToken()}`
      },
    }).then(this._checkResponse);
  }

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${this.getToken()}`
      },
      body: JSON.stringify({
        _id: movie._id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      }),
    }).then(this._checkResponse);
  }

  deleteMovie(movieId) {
    this._movieId = movieId;
    return fetch(`${this._baseUrl}/movies/${this._movieId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${this.getToken()}`
      },
    }).then(this._checkResponse);
  }

  signout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${this.getToken()}`
      },
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: "https://movie-explorer.nomoredomains.rocks/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
