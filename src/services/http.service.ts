import axios from "axios";
import { apiUrls } from "../configs/apiUrl";

export const http = axios.create({
  baseURL: apiUrls.baseURL,
});

http.interceptors.request.use(
  function (config) {
    if (!config.baseURL?.includes(apiUrls.authUrl)) {
      config.url += ".json";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const covertToArray = (data: any) => {
  let result = [];

  if (typeof data === "object" && !Array.isArray(data)) {
    for (const key in data) {
      if (data[key] && data[key].id && data[key].id === key) {
        const updatedData: any = {};
        for (const j in data[key]) {
          if (data[key][j] && typeof data[key][j] === "object" && !Array.isArray(data[key][j])) {
            const updatedPropValue = covertToArray(data[key][j]);
            updatedData[j] = updatedPropValue;
          } else {
            updatedData[j] = data[key][j];
          }
        }
        result.push(updatedData);
      } else {
        result = data;
      }
    }

    return result;
  } else {
    return data;
  }
};

http.interceptors.response.use(
  function onFulfilled(response) {
    response.data = covertToArray(response.data);

    return response;
  },
  function onRejected(error) {
    return Promise.reject(error);
  }
);
