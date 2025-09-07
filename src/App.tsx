import { Route, Routes } from "react-router-dom";
import { MainRoutes } from "./routes/MainRoutes";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "./types/store";
import { useEffect } from "react";
import { localStorageService } from "./services/localStorage.service";
import { LOCAL_STORAGE_USER_ID } from "./consts/auth";
import { getUser } from "./store/authSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = localStorageService.get(LOCAL_STORAGE_USER_ID);
    if (userId) {
      dispatch(getUser(userId));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/*" element={<MainRoutes />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
