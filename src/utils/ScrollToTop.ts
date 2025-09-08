import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Эта строка устанавливает скролл на верхнюю позицию
    window.scrollTo(0, 0);
  }, [pathname]); // запускает эффект при каждом изменении пути

  return null;
};

export default ScrollToTop;
