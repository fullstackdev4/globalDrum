import { clearStore } from "../store/slices/login";
import { store } from "../store/index";

export const requestHandler = (request: any) => {
  const token = localStorage.getItem("accessToken") || "";
  // if (token) request.headers.Authorization = `Bearer ${token}`;

  request.headers.Authorization =
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjlmNDIyYzMzN2U5ZjUxMjNlZTQ0NDZmOWU5MDQ2MjgyNmM3OTc2NzAwY2U1NjVmMjdjZDlmZGFjZmQ5MzJiMDY4YTRhZWU1MzFiMDk1ZjkiLCJpYXQiOjE2ODE2MDM1MDAuNzkxOTI3LCJuYmYiOjE2ODE2MDM1MDAuNzkxOTMzLCJleHAiOjE3MTMyMjU5MDAuNjQ2NDA2LCJzdWIiOiIxMSIsInNjb3BlcyI6W119.PKi1vRMDsCINpvbJstEOGcEa8hgcVmjB18-0SzZfPv1HFlRi9zEirMzXGchqmNKl6cy3bKt545s1W-RNsrQJH_ccgqXRpnFAb9O648ps3hmnVSAtJMP9F-uKXWMbVM4129nPKkXUaQJouGYCi9M_TzjqdLcXNFSmnO_IuqdKg2LVp47TsaRTRpM8lUZtUFoYxISXDxSVUUjNMuX6lBJYFNoC3CAzpe0oQT_JHFDbV8M7VlEmu-QRi8irOE_kd_npzBgfu-LRCYEt2x5A2_oV2WycosEsTcnSiZn-MX0SO4-Qjfd47s6XPj7BTy9DZdEmCRmsA3sNnNWFY3yn-Vezq7MKFFcyKHZjoT2xP93DyUCxOBnhC7KTVhFOCxQIGSjPpUpB-3X9OLd6pdXsaIdVM2GThfgwnvjRPOeOM1sSsTGbmCpbQtwcx2AZnu6U1jp1hdLqxxxyhN7V5Vzwlsq5PeygbTa1bJ0eHkVLDO4WC6j9ClltFTjQ6SZunbSFsjF2kObfRO21Ytr86dwyOB50vUBGKV0BPMP1pKaEavTDL22BujoHEDmSxUaV4WWKGe1NTUW1WN84J4OQnVA6aKVWalsKydDvPGtfuaycXA3WPSNzEHfwnvjVxOKaxgpJkDp5E9a1ud-FowtF79nOzH-rPRWSw0pnEc2h-j4wqVrLL3Y";
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
