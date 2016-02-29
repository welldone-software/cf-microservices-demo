const apiBaseUrl = '';//http://localhost:8000';


const apiFetch = (path, params) => {
  const url = apiBaseUrl + '/api/' + path;
  return fetch(url, params).then(response => response.json());
}

const apiGet = (path, token) => {
  const params = {
    method: 'get',
    mode: 'cors',
    headers: new Headers({
      'Accept': 'application/json',
      'X-Token': token
    })
  };
  return apiFetch(path, params);
}

const apiPost = (path, data, token, method) => {
  const params = {
    method: method || 'post',
    mode: 'cors',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Token': token
    }),
    body: JSON.stringify(data)
  };

  return apiFetch(path, params);
}

const todosApi = {

  apiGet,

  apiPost
};

export default todosApi;
