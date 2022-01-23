import axios from 'axios';

const ApiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

//Trasform response only data, no headers response

ApiClient.interceptors.response.use(
  (response) => response.data,
  //If the response is an error, we control all possible errors
  //and format them to pass the text to you with try catch
  (error) => {
    if (!error.response) {
      return Promise.reject({ message: error.message });
    }
    return Promise.reject({
      message: error.response.statusText,
      ...error.response,
      ...error.response.data
    });
  }
);

// ApiClient.interceptors.request.use((config) => {
//   config.headers['Content-Type'] = 'multipart/form-data;';
//   return config;
// });

//Function create auttentication header with token in localStorage
export const setAuthorizationHeader = (token) => {
  ApiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

//Function delete autenticatios headers
export const removeAuthorizationHeader = () => {
  delete ApiClient.defaults.headers.common['Authorization'];
};

export default ApiClient;
