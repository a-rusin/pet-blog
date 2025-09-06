import { useEffect } from "react";
import { Article } from ".";
import { useAppDispatch } from "../../types/store";
import { fetchAllArticles } from "../../store/articlesSlice";

export const ArticlesList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllArticles());
  }, []);

  const handleClick = async () => {};

  return (
    <>
      <button onClick={handleClick}>Create</button>

      <ul className="flex gap-4 pt-20 flex-wrap container">
        <Article />
      </ul>
    </>
  );
};
