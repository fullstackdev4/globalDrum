import { clearStore } from "../store/slices/login";
import { store } from "../store/index";

export const requestHandler = (request: any) => {
  const token = localStorage.getItem("accessToken") || "";
  if (token) request.headers.Authorization = `Bearer ${token}`;
  return request;
};

export const successHandler = (response: any) => {
  return {
    ...response,
    data: response.data,
  };
};

export const errorHandler = (error: any) => {
  const { status } = error.response;
  if (status === 401) {
    const { dispatch } = store;
    dispatch(clearStore());
  }
  return Promise.reject(error);
};
