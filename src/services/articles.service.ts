import { apiUrls } from "../configs/apiUrl";
import { ArticleServer } from "../types/Article";
import { http } from "./http.service";

export const articlesService = {
  getAll: async () => {
    const url = apiUrls.articles;
    const { data } = await http.get<ArticleServer[] | null>(url);
    return data;
  },
  getById: async (id: string) => {
    const url = `${apiUrls.articles}/${id}`;

    const { data } = await http.get<ArticleServer>(url);
    return data;
  },
  createAndUpdate: async (payload: ArticleServer) => {
    const url = `${apiUrls.articles}/${payload.id}`;
    const { data } = await http.put<ArticleServer>(url, payload);
    return data;
  },
};
