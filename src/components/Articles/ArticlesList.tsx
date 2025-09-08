import { useEffect } from "react";
import { Article } from ".";
import { useAppDispatch } from "../../types/store";
import { fetchAllArticles } from "../../store/articlesSlice";
import { useAppSelector } from "../../types/store";
import { Skeleton } from "../Skeleton";

export const ArticlesList = () => {
  const { entities: articles, errors, isLoading } = useAppSelector((store) => store.articles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllArticles());
  }, []);

  if (isLoading) {
    return (
      <ul className="flex gap-4 pt-20 container">
        <Skeleton classNames="h-[590px] basis-1/3 rounded-md shrink" />
        <Skeleton classNames="h-[590px] basis-1/3 rounded-md shrink" />
        <Skeleton classNames="h-[590px] basis-1/3 rounded-md shrink" />
      </ul>
    );
  }

  if (errors) {
    return (
      <div className="text-center text-2xl container pt-20 text-red-800 font-bold">
        Ooops! Some error, please try letter. <br />
        ErrorMessage: {errors}
      </div>
    );
  }

  if (!articles) {
    return <div className="text-center text-2xl container pt-20">No articles yet</div>;
  }

  return (
    <>
      <ul className="flex gap-4 pt-20 container">
        {articles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </ul>
    </>
  );
};
