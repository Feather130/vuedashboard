import axios from "axios";

axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers["Authorization"] =
      "Basic c3VueXVtaW5nL3N1bnl1bWluZzpoZWxsb0AxMjM=";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function post(url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, config).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

export function put(url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data, config).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}
