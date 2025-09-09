export const routes = {
  home: "/",
  login: "/login",
  article: (str: string): string => `/article/${str}`,
  createArticle: (isPathIncluded: boolean): string => (isPathIncluded ? "/article/create" : "/create"),
};
