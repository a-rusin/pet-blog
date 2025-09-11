import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { ArticleRoutes } from "./AricleRoutes";
import { routes } from "../configs/routes";
import { Login } from "./Login";
import { UserRoutes } from "./UserRoutes";
import { ProtectedRoute } from "../components/HOC/ProtectedRoute";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.article("*", false)} element={<ArticleRoutes />} />
        <Route
          path={routes.user("*", false)}
          element={
            <ProtectedRoute>
              <UserRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
