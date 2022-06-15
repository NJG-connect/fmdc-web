// params hearders
//   mode: 'cors',
//   cache: 'default'

type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

class ApiService {
  async request(url: string, method: Method, body?: Object, params?: any) {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
        Authorization: this.getTokenFromContext(),
        ...params,
      },
      body: body ? JSON.stringify(body) : null,
    });
    let responseJson;
    try {
      responseJson = await response.json();
    } catch (error) {}
    if (response.ok) {
      return { succes: true, data: responseJson };
    }
    if (response.status === 401 && responseJson === 'token non valide') {
    }
    return { succes: false, data: responseJson };
  }

  getTokenFromContext() {
    try {
      const infoUserJSON = localStorage.getItem(
        process.env.REACT_APP_JWT_SECRET!,
      );
      if (infoUserJSON) {
        const infoUser = JSON.parse(infoUserJSON);
        return `Bearer ${infoUser.token}`;
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  async get(url: string) {
    return await this.request(url, 'GET');
  }

  async post(url: string, body: Object) {
    return await this.request(url, 'POST', body);
  }

  async patch(url: string, body: Object) {
    return await this.request(url, 'PATCH', body);
  }
  async put(url: string, body: Object) {
    return await this.request(url, 'PUT', body);
  }

  async delete(url: string) {
    return await this.request(url, 'DELETE');
  }
}

export default new ApiService();
