import axios, { AxiosError } from "axios";
import { ENV, STORAGE_VAR } from "./env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Href, router } from "expo-router";
import { ToastAndroid } from "react-native";

let isRedirectingToLogin = false;

export const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

export const apiNoToken = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

const handleResponseError = async (
  error: AxiosError,
  redirectToLogin: boolean = false
) => {
  const status = error.response?.status;
  const data: any = error.response?.data;

  const logError = () => {
    console.log("AXIOS ERROR:", {
      url: error.config?.url,
      method: error.config?.method,
      status,
      data,
    });
  };

  if (axios.isAxiosError(error)) {
    logError();

    switch (status) {
      case 422:
        console.log("ERROR 422: ", error);

        break;
      case 401:
        if (redirectToLogin) {
          if (!isRedirectingToLogin) {
            isRedirectingToLogin = true;
            await AsyncStorage.clear();
          }
          router.replace("/(auth)/login" as Href);
          return;
        } else {
          //
        }
        break;
      case 403:
        //
        break;
      case 404:
        //
        break;
      case 429:
        //
        break;
      case 500:
        console.log("AXIOS ERROR 500:", error);
        break;

      case 406:
        console.log("AXIOS ERROR 406:", error);
        break;

      default:
        //
        break;
    }
  } else {
    // Network or unknown error
    console.log("NON-AXIOS ERROR:", error);
    //
  }

  return Promise.reject(error);
};

api.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem(STORAGE_VAR.token);
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);
apiNoToken.interceptors.response.use(
  (response) => response,
  (error) => handleResponseError(error)
);
