import { useEffect, useState } from "react";
import { useAppSelector } from "../types/store";
import { ArticleServer } from "../types/Article";
import { articlesService } from "../services/articles.service";
import { errorHandler } from "../utils/errorHandler";
import { Link } from "react-router-dom";
import { routes } from "../configs/routes";
import { Skeleton } from "../components/Skeleton";
import { convertDate } from "../utils/convertDate";

export const UserArticles = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [articles, setArticles] = useState<ArticleServer[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    getUserArticles();
  }, []);

  const getUserArticles = async () => {
    try {
      const data = await articlesService.getUserArticle(user!.id);
      setArticles(data);
      setIsLoading(false);
    } catch (error: unknown) {
      const errors = errorHandler(error);
      setErrors(errors);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container pt-8">
        <h2 className="text-5xl font-cabinet-grotesk-variable pt-8">My articles:</h2>
        <ul className="divide-y divide-gray-200 pt-8">
          {[1, 2, 3].map((item) => (
            <li key={item} className="py-4">
              {" "}
              <Skeleton classNames="h-[28px] w-full rounded-md grow" />
            </li>
          ))}
        </ul>
      </div>
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

  if (!articles || articles.length === 0) {
    return (
      <div className="container pt-8">
        <h2 className="text-5xl font-cabinet-grotesk-variable pt-8">My articles:</h2>
        <div className="pt-8 text-xl">No Articles yet</div>
        <Link
          className="inline-block mt-4 text-xl underline decoration-solid"
          to={routes.user("create-article", false)}
        >
          Create your first articles now
        </Link>
      </div>
    );
  }

  return (
    <div className="container pt-8">
      <h2 className="text-5xl font-cabinet-grotesk-variable pt-8">My articles:</h2>
      <ul className="divide-y divide-gray-200 pt-8">
        {articles.map((item, index) => (
          <li key={item.id} className="py-4 flex gap-2 justify-between">
            <div className="text-lg">
              <div>
                <span>{index + 1}. </span>
                <Link className="underline decoration-solid" to={routes.article(item.id, false)}>
                  {item.title}
                </Link>
              </div>
            </div>
            <div className="text-black/50 text-sm">{convertDate.toClient(item.createdAt)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
