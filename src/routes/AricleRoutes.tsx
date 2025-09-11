import { Route, Routes } from "react-router-dom";
import { Article } from "../pages/Article";
import { routes } from "../configs/routes";

export const ArticleRoutes = () => {
  return (
    <Routes>
      <Route path={routes.article(":id", true)} element={<Article />} />
    </Routes>
  );
};
