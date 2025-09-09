import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../types/store";
import { toast } from "react-toastify";
import { Skeleton } from "../Skeleton";

interface Props {
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<Props> = ({ children }): React.ReactElement<any, any> | null => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const location = useLocation();

  if (isLoading) {
    return <Skeleton classNames="h-[400px] w-full rounded-md mt-4" />;
  }

  if (!isLoading && !user) {
    toast.error("No access! Try login");

    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return children;
};
