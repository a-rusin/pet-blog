import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { ArticleRoutes } from "./AricleRoutes";
import { routes } from "../configs/routes";
import { Login } from "./Login";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.article("*")} element={<ArticleRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
