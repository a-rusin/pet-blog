import { Link } from "react-router-dom";
import { routes } from "../../configs/routes";
import { ArticleClient } from "../../types/Article";
import { useAppDispatch, useAppSelector } from "../../types/store";
import { createUpdateArticle } from "../../store/articlesSlice";
import { FaRegHeart } from "react-icons/fa6";
import { IoHeart, IoEyeSharp } from "react-icons/io5";
import { toast } from "react-toastify";

export const Article: React.FC<{ article: ArticleClient }> = ({ article }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleClickView = () => {
    const newViewersId: string = user ? user.id : "guest";

    const updatedArticle: ArticleClient = {
      ...article,
      views: article.views ? [...article.views, newViewersId] : [newViewersId],
    };
    dispatch(createUpdateArticle(updatedArticle));
  };

  const isLikedByCurrentUser = (): boolean => {
    if (!user) return false;

    return article.likes ? article.likes.includes(user.id) : false;
  };

  const handleLikeClick = () => {
    if (!user) {
      toast.error("You need login to liked articles");
      return;
    }

    let updatedLikes: string[] = [];

    if (article.likes) {
      updatedLikes = isLikedByCurrentUser()
        ? article.likes.filter((like: string) => like !== user.id)
        : [...article.likes, user.id];
    } else {
      updatedLikes.push(user.id);
    }

    // if ()

    const updatedArticles: ArticleClient = {
      ...article,
      likes: updatedLikes,
    };

    dispatch(createUpdateArticle(updatedArticles));
  };

  return (
    <li className="basis-1/3 shrink">
      <div className="relative">
        <img src="#" alt="Картинка" className="w-full h-[339px] bg-gray-500" />
        <ul className="absolute top-4 left-4 flex gap-1">
          {article.tags.map((tag) => (
            <li key={tag} className="article-tags ">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link
          to={routes.article(article.id)}
          className="block font-bold pt-6 text-2xl font-cabinet-grotesk-variable hover:underline hover:decoration-solid min-h-[90px]"
          onClick={handleClickView}
        >
          {article.title}
        </Link>
        <ul className="flex gap-4 pt-4 items-center">
          <li className="flex gap-1 items-center">
            <img src={article.author.avatarUrl} alt="Автарака" className="w-8 rounded-full" />
            <p className="font-light text-base">{article.author.login}</p>
          </li>
          <li className="font-light text-base text-black/50">{article.createdAt}</li>
        </ul>
        <p className="font-light text-base text-black/50 pt-4 min-h-[140px]">{article.description}</p>
        <div className="text-black/50 text-base mt-4 flex gap-2">
          <div className="flex gap-1 items-center cursor-pointer" onClick={handleLikeClick}>
            <div>
              {isLikedByCurrentUser() ? (
                <IoHeart style={{ width: "16px", height: "16px" }} color="red" className="relative bottom-[1px]" />
              ) : (
                <FaRegHeart style={{ width: "16px", height: "16px" }} className="relative bottom-[1px]" />
              )}
            </div>
            <div>{article.likes ? article.likes.length : 0}</div>
          </div>
          <div>|</div>
          <div>Comments</div>
          <div>|</div>
          <div className="flex gap-1 items-center ">
            <IoEyeSharp style={{ width: "16px", height: "16px" }} className="relative bottom-[1px]" />{" "}
            <div>{article.views ? article.views.length : 0}</div>
          </div>
        </div>
      </div>
    </li>
  );
};
