import { apiUrls } from "../configs/apiUrl";
import { User, UserLogin, UserRegister, UserServerResponce } from "../types/Auth";
import { http } from "./http.service";

export const authService = {
  register: async (payload: UserRegister) => {
    const url = apiUrls.register;
    const { data } = await http.post<UserServerResponce>(url, payload, {
      baseURL: apiUrls.authUrl,
    });
    return data;
  },
  login: async (payload: UserLogin) => {
    const url = apiUrls.login;
    const { data } = await http.post<UserServerResponce>(url, payload, {
      baseURL: apiUrls.authUrl,
    });
    return data;
  },
  createUser: async (payload: User) => {
    const url = `${apiUrls.users}/${payload.id}`;
    const { data } = await http.put<User>(url, payload);
    return data;
  },
  getUser: async (userId: UserServerResponce["localId"]) => {
    const url = `${apiUrls.users}/${userId}`;
    const { data } = await http.get<User>(url);
    return data;
  },
};
