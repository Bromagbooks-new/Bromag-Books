import axios from "axios";
import { RestaurantAdminApi } from "./global";
import toast from "react-hot-toast";

const TIMEOUT_DURATION = 110000;

const createAxiosInstanceWithInterceptorUser = (baseURL, token) => {
  // console.log('baseURL:', baseURL);
  const instance = axios.create({
    baseURL: baseURL,
    timeout: TIMEOUT_DURATION,
  });

  instance.interceptors.request.use(
    (config) => {
      let details;
      // console.log('details1:', details)

      if (token === "restaurant") {
        details = localStorage.getItem("restaurant");
      } else if (token === "owner") {
        details = localStorage.getItem("atoken");
      } else if (token === "pos") {
        details = localStorage.getItem("posToken");
      } else if (token === "cap") {
        details = localStorage.getItem("capToken");
      }

      if (details) {
        config.headers["Authorization"] = `${details}`;
      }

      // console.log('config1:', config)
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      // console.log('response1:', response)
      return response
    },
    (error) => {
      // console.log('error2:', error)
      if (error.response) {
        if (error.response.status === 401) {
          // window.location.href = '/error404';
          console.log("err", error);
        } else if (error.response.status === 500) {
          // window.location.href = '/error500';
          console.log("err", error);
        } else {
          console.log("HTTP ERROR CODE:", error.response.status);
        }
      } else {
        console.log("Network Error:", error.message);
      }
      return Promise.reject(error);
    }
  );

  // console.log('instance:', instance)
  return instance;
};

const restaurantAxiosInstance = createAxiosInstanceWithInterceptorUser(
  RestaurantAdminApi,
  "restaurant"
);
const restaurantOwnerAxiosInstance = createAxiosInstanceWithInterceptorUser(
  RestaurantAdminApi,
  "owner"
);
const restaurantPosAxiosInstance = createAxiosInstanceWithInterceptorUser(
  RestaurantAdminApi,
  "pos"
);
const restaurantCapAxiosInstance = createAxiosInstanceWithInterceptorUser(
  RestaurantAdminApi,
  "cap"
);

export {
  restaurantAxiosInstance,
  restaurantOwnerAxiosInstance,
  restaurantPosAxiosInstance,
  restaurantCapAxiosInstance,
};
