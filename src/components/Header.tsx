import { Link } from "react-router-dom";
import { routes } from "../configs/routes";
import { useAppSelector } from "../types/store";

export const Header = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  return (
    <header className="container">
      <nav className="flex justify-between items-center h-20">
        <Link to={routes.home} className="font-cabinet-grotesk-variable text-3xl inline-block">
          My Blog
        </Link>
        {isLoading ? (
          <div className="font-light text-black/50 text-xl ">Logining...</div>
        ) : user ? (
          <div className="font-light text-black/50 text-xl ">
            Hello, <span className="underline decoration-solid">{user.login}</span>!
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
