import { Route, Routes } from "react-router-dom";
import { Article } from "../pages/Article";
import { CreateArticle } from "../pages/CreateArticle";
import { routes } from "../configs/routes";
import { ProtectedRoute } from "../components/HOC/ProtectedRoute";

export const ArticleRoutes = () => {
  return (
    <Routes>
      <Route
        path={routes.createArticle(false)}
        element={
          <ProtectedRoute>
            <CreateArticle />
          </ProtectedRoute>
        }
      />

      <Route path=":id" element={<Article />} />
    </Routes>
  );
};
