export const apiUrls = {
  baseURL: "https://blog-dfb94-default-rtdb.firebaseio.com/",
  authUrl: "https://identitytoolkit.googleapis.com/v1/",
  articles: "/articles",
  register: `accounts:signUp?key=${process.env.REACT_APP_API_KEY}`,
};
