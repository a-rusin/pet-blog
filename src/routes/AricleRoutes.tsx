import { Route, Routes } from "react-router-dom";
import { Article } from "../pages/Article";

export const ArticleRoutes = () => {
  return (
    <Routes>
      <Route path=":id" element={<Article />} />
    </Routes>
  );
};
