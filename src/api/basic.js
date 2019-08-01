import axios from "axios";
import { message } from "ant-design-vue";

axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers["Authorization"] =
      "Basic c3VueXVtaW5nL3N1bnl1bWluZzoxMjM0NTY3OA==";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    switch (error.response.status) {
      case 404:
        message.error(error.response.data.message, 5);
        break;
    }
    return Promise.reject(error);
  }
);

async function get(url, params = {}) {
  try {
    const response = await axios.get(url, { params });
    return new Promise(resolve => {
      resolve(response.data);
    });
  } catch (err) {
    throw new Error(err);
  }
}

async function post(url, data = {}, config = {}) {
  try {
    let response = await axios.post(url, data, config);
    return new Promise(resolve => {
      resolve(response.data);
    });
  } catch (err) {
    throw new Error(err);
  }
}

async function put(url, data = {}, config = {}) {
  try {
    let response = await axios.put(url, data, config);
    return new Promise(resolve => {
      resolve(response.data);
    });
  } catch (err) {
    throw new Error(err);
  }
}

let NAMESPACE = "application/vnd.com.nsn.cumulocity.";

export { get, post, put, NAMESPACE };
