import { toast } from "react-toastify";
import { clearAuthLocalStorage, logout } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../types/store";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdExitToApp } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { routes } from "../configs/routes";

interface Props {
  isUserMenuOpen: boolean;
  openUserMenu: () => void;
}

export const UserHeader: React.FC<Props> = ({ isUserMenuOpen, openUserMenu }) => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickLogout = () => {
    toast.success("Successful logout");
    clearAuthLocalStorage();
    dispatch(logout());
    navigate("/", {
      replace: true,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    openUserMenu();
  };

  const handleClickCreateArticle = () => {
    navigate(routes.createArticle(true));
  };

  return (
    <div className="font-light text-black/50 text-xl relative ">
      <div className="flex items-center cursor-pointer" onClick={handleClick}>
        <img src={user?.avatarUrl} alt="Автарка" className="w-8 rounded-full block mr-3" />
        <div className=" font-bold mr-1">{user?.login}</div>
        <RiArrowDownSLine color="rgba(0, 0, 0, 0.5)" style={{ width: "20px", height: "20px" }} />
      </div>
      {isUserMenuOpen && (
        <ul className=" absolute top-[calc(100%+10px)] right-0 w-56 text-black rounded-md overflow-hidden text-base">
          <li className="cursor-not-allowed bg-gray-100 p-3 hover:bg-gray-200 flex gap-2 items-center">
            <MdOutlineArticle style={{ width: "18px", height: "18px" }} />
            <span>
              My articles <i>(IN DEV)</i>
            </span>
          </li>
          <li
            className="cursor-pointer bg-gray-100 p-3 hover:bg-gray-200 flex gap-2 items-center"
            onClick={handleClickCreateArticle}
          >
            <IoMdAddCircleOutline style={{ width: "18px", height: "18px" }} />
            <span>Create article</span>
          </li>
          <li
            className="cursor-pointer text-red-600 font-bold bg-gray-100 p-3 hover:bg-gray-200 flex gap-2 items-center"
            onClick={handleClickLogout}
          >
            <MdExitToApp style={{ width: "18px", height: "18px" }} />

            <span>Logout</span>
          </li>
        </ul>
      )}
    </div>
  );
};
