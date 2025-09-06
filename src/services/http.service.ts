import axios from "axios";

export const http = axios.create({
  baseURL: "https://blog-dfb94-default-rtdb.firebaseio.com/",
});

http.interceptors.request.use(
  function (config) {
    config.url += ".json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function onFulfilled(response) {
    const data = response.data;
    const updatedData = [];

    for (const key in data) {
      updatedData.push(data[key]);
    }

    response.data = updatedData;

    return response;
  },
  function onRejected(error) {
    return Promise.reject(error);
  }
);
