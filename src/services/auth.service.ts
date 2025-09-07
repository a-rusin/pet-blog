import { apiUrls } from "../configs/apiUrl";
import { UserCreated, UserRegister, UserRegisterServerResponce } from "../types/Auth";
import { http } from "./http.service";

export const authService = {
  register: async (payload: UserRegister) => {
    const url = apiUrls.register;
    const { data } = await http.post<UserRegisterServerResponce>(url, payload, {
      baseURL: apiUrls.authUrl,
    });
    return data;
  },
  createUser: async (payload: UserCreated) => {
    const url = `${apiUrls.users}/${payload.id}`;
    const { data } = await http.put<UserCreated>(url, payload);
    return data;
  },
};
