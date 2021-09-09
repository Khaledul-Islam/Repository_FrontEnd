import axios from 'axios';
import { RepositoryAPI } from '../../public/config'


const API_URL = 'https://localhost:44383/Users/Authenticate/authenticate';

class AuthService {
  login(user) {
    this.LoginBody = {
      path: '/Users/Authenticate/authenticate',
      method: 'POST',
      data: {
        username: user.username,
        password: user.password
      },
    }
    let requestPath = RepositoryAPI.URL + RepositoryAPI.ServicePath + this.LoginBody.path

    return axios
      .post(requestPath, this.LoginBody.data)
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL, {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
