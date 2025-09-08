import { Link } from "react-router-dom";
import { routes } from "../configs/routes";
import { useAppDispatch, useAppSelector } from "../types/store";
import { clearAuthLocalStorage, logout } from "../store/authSlice";
import { toast } from "react-toastify";
import { Skeleton } from "./Skeleton";

export const Header = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleClickLogout = () => {
    toast.success("Successful logout");
    clearAuthLocalStorage();
    dispatch(logout());
  };

  return (
    <header className="container">
      <nav className="flex justify-between items-center h-20">
        <Link to={routes.home} className="font-cabinet-grotesk-variable text-3xl inline-block">
          My Blog
        </Link>
        {isLoading ? (
          <Skeleton classNames="h-10 basis-[125px] rounded-md shrink" />
        ) : user ? (
          <div className="flex gap-2 font-light text-black/50 text-xl">
            <div>
              Hello, <span className="underline decoration-solid">{user.login}</span>!
            </div>
            <div className="cursor-pointer text-red-600 font-bold" onClick={handleClickLogout}>
              Logout
            </div>
          </div>
        ) : (
          <Link to={routes.login} className="font-light text-black/50 text-xl hover:underline hover:decoration-solid">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};
