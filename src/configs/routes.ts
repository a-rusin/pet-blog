export const routes = {
  home: "/",
  login: "/login",
  article: (str: string): string => `/article/${str}`,
};
