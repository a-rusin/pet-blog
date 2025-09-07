import { apiUrls } from "../configs/apiUrl";
import { UserRegister, UserRegisterServerResponce } from "../types/Auth";
import { http } from "./http.service";

export const authService = {
  register: async (payload: UserRegister) => {
    const url = apiUrls.register;
    const { data } = await http.post<UserRegisterServerResponce>(url, payload, {
      baseURL: apiUrls.authUrl,
    });
    return data;
  },
};
