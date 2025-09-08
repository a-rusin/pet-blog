import { Link } from "react-router-dom";
import { routes } from "../configs/routes";
import { useAppSelector } from "../types/store";
import { Skeleton } from "./Skeleton";
import { UserHeader } from "./UserHeader";
import { useEffect, useState } from "react";

export const Header = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const openUserMenu = () => {
    setIsUserMenuOpen(true);
  };

  useEffect(() => {
    document.addEventListener("click", () => {
      setIsUserMenuOpen(false);
    });
  }, []);

  return (
    <header className="container">
      <nav className="flex justify-between items-center h-20">
        <Link to={routes.home} className="font-cabinet-grotesk-variable text-3xl inline-block">
          My Blog
        </Link>
        {isLoading ? (
          <Skeleton classNames="h-10 basis-[125px] rounded-md shrink" />
        ) : user ? (
          <UserHeader isUserMenuOpen={isUserMenuOpen} openUserMenu={openUserMenu} />
        ) : (
          <Link to={routes.login} className="font-light text-black/50 text-xl hover:underline hover:decoration-solid">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};
