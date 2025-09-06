import { Link } from "react-router-dom";
import { routes } from "../configs/routes";

export const Header = () => {
  return (
    <header className="container">
      <nav className="flex justify-between items-center h-20">
        <Link to={routes.home} className="font-cabinet-grotesk-variable text-3xl inline-block">
          My Blog
        </Link>
        <Link to={routes.login} className="font-light text-black/50 text-xl hover:underline hover:decoration-solid">
          Login
        </Link>
      </nav>
    </header>
  );
};
