export class API {
  static async loginUser(body) {
    const resp = await fetch(`http://127.0.0.1:8000/auth/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    return await resp.json()
  }

  static async registerUser(body) {
    const resp = await fetch(`http://127.0.0.1:8000/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    return await resp.json()
  }

  static async getMovies(token){
    const resp = await fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Token ${token}`
      }
    })
    return await resp.json()
  }

  static async updateMovie(mov_id, body, token) {
    const resp = await fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)
    })
    return await resp.json()
  }

  static async createMovie(body, token) {
    const resp = await fetch(`http://127.0.0.1:8000/api/movies/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)
    })
    return await resp.json()
  }
  static deleteMovie(mov_id, token) {
    return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
        })
  }
}