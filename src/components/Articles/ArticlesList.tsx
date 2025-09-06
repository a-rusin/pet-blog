import { useEffect } from "react";
import { Article } from ".";
import { useAppDispatch } from "../../types/store";
import { fetchAllArticles } from "../../store/articlesSlice";

export const ArticlesList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllArticles());
  }, []);

  return (
    <>
      <ul className="flex gap-4 pt-20 flex-wrap container">
        <Article />
      </ul>
    </>
  );
};
