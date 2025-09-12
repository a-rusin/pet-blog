import { Route, Routes } from "react-router-dom";
import { CreateUpdateArticle } from "../pages/CreateUpdateArticle";
import { routes } from "../configs/routes";
import { UserArticles } from "../pages/UserArticles";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path={routes.user("create-article", true)} element={<CreateUpdateArticle />} />
      <Route path={routes.user("my-articles", true)} element={<UserArticles />} />
      <Route path={routes.user("my-articles/edit/:articleId", true)} element={<CreateUpdateArticle />} />
    </Routes>
  );
};
