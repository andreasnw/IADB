import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async function (config) {
    console.log(
      `%cRequest: ${config.url}`,
      "background-color: orange; color: black",
      {
        baseUrl: `${config.baseURL}${config.url}`,
        headers: config.headers,
        params: config.params,
        data: config.data,
      },
    );
    return config;
  },
  function (error) {
    // console.log('ERROR:', {...error})
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    console.log(
      `%cResponse: ${response.config.url}`,
      "background-color: green; color: white",
      {
        data: response.data,
      },
    );
    return response;
  },
  function (error) {
    console.log("%cERROR:", "background-color: red; color: white", {
      ...error,
    });
    return Promise.reject(error);
  },
);

export default api;
