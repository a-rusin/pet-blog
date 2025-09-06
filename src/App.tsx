import { Route, Routes } from "react-router-dom";
import { MainRoutes } from "./routes/MainRoutes";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<MainRoutes />} />
    </Routes>
  );
}

export default App;
