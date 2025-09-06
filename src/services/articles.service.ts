import { apiUrls } from "../configs/apiUrl";
import { Article } from "../types/Article";
import { http } from "./http.service";

export const articlesService = {
  getAll: async () => {
    const url = apiUrls.articles;
    const { data } = await http.get<Article[] | null>(url);
    return data;
  },
  getById: async (id: string) => {
    const url = `${apiUrls.articles}/${id}`;

    const { data } = await http.get<Article>(url);
    return data;
  },
  create: async (payload: Article) => {
    const url = `${apiUrls.articles}/${payload.id}`;
    const { data } = await http.put(url, payload);
    return data;
  },
};
