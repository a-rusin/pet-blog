import { Article } from ".";
import { useAppSelector } from "../../types/store";
import { Skeleton } from "../Skeleton";

export const ArticlesList = () => {
  const { entities: articles, errors, isLoading } = useAppSelector((store) => store.articles);

  if (isLoading) {
    return (
      <ul className="flex flex-wrap gap-4 pt-20 container">
        <Skeleton classNames="h-[590px] basis-[373px] rounded-md" />
        <Skeleton classNames="h-[590px] basis-[373px] rounded-md" />
        <Skeleton classNames="h-[590px] basis-[373px] rounded-md" />
      </ul>
    );
  }

  if (errors) {
    return (
      <div className="text-center text-2xl container pt-20 text-red-800 font-bold">
        Ooops! Some error, please try latter. <br />
        ErrorMessage: {errors}
      </div>
    );
  }

  if (!articles) {
    return <div className="text-center text-2xl container pt-20">No articles yet</div>;
  }

  return (
    <>
      <ul className="flex flex-wrap gap-4 pt-20 container">
        {articles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </ul>
    </>
  );
};
