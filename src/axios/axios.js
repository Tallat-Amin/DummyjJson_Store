import axios from "axios";
// DummyAPI URL and
const DUMMY_API_URL = process.env.REACT_APP_DUMMY_URL;
export const dummyAxios = axios.create({ baseURL: DUMMY_API_URL });

const DUMMYJSON_URL = process.env.REACT_APP_DUMMYJSON_URL;
export const dummyJson = axios.create({ baseURL: DUMMYJSON_URL });
dummyJson.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
