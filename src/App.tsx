import { Route, Routes } from "react-router-dom";
import { MainRoutes } from "./routes/MainRoutes";
import { ToastContainer } from "react-toastify";

function App() {
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
