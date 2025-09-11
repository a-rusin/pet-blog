import { Route, Routes } from "react-router-dom";
import { CreateArticle } from "../pages/CreateArticle";
import { routes } from "../configs/routes";
import { UserArticles } from "../pages/UserArticles";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path={routes.user("create-article", true)} element={<CreateArticle />} />
      <Route path={routes.user("my-articles", true)} element={<UserArticles />} />
    </Routes>
  );
};
