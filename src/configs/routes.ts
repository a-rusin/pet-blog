export const routes = {
  home: "/",
  login: "/login",
  article: (str: string, directLink: boolean): string => (directLink ? str : `/article/${str}`),
  user: (str: string, directLink: boolean): string => (directLink ? str : `/user/${str}`),
};
