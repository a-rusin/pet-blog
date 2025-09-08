import { Link } from "react-router-dom";
import { routes } from "../../configs/routes";
import { Article as IArticle } from "../../types/Article";
import { useAppDispatch, useAppSelector } from "../../types/store";
import { updateArticle } from "../../store/articlesSlice";

export const Article: React.FC<{ article: IArticle }> = ({ article }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleClick = () => {
    const newViewersId: string = user ? user.id : "guest";

    const updatedArticle: IArticle = {
      ...article,
      views: [...article.views, newViewersId],
    };
    dispatch(updateArticle(updatedArticle));
  };

  return (
    <li className="w-96">
      <div className="relative">
        <img
          src="https://avatars.mds.yandex.net/get-lpc/12602567/6cbfdbd7-3c7d-4e91-89a4-2e364a7ef01b/orig?width=768&height=660"
          alt="Картинка"
          className="w-full"
        />
        <ul className="absolute top-4 left-4 flex gap-1">
          <li className="article-tags">Photography</li>
          <li className="article-tags">Abstract</li>
        </ul>
      </div>
      <div>
        <Link
          to={routes.article(article.id)}
          className="block font-bold pt-6 text-2xl font-cabinet-grotesk-variable hover:underline hover:decoration-solid"
          onClick={handleClick}
        >
          {article.title}
        </Link>
        <ul className="flex gap-4 pt-4 items-center">
          <li className="flex gap-1 items-center">
            <img
              src="https://avatars.mds.yandex.net/get-lpc/12602567/d920d2ed-4c69-4062-8e06-f61cefd46536/orig?width=64&height=64"
              alt="Автарака"
              className="w-8 rounded-full"
            />
            <p className="font-light text-base">Paris Washington</p>
          </li>
          <li className="font-light text-base text-black/50">June 28, 2018</li>
          <li className="font-light text-base text-black/50 pl-5 bg-share-icon bg-left bg-no-repeat bg-[length:15px]">
            1K shares
          </li>
        </ul>
        <p className="font-light text-base text-black/50 pt-4">{article.description}</p>
        <div className=" text-black/50 text-base mt-4">Likes / Comments / Views: {article.views.length}</div>
      </div>
    </li>
  );
};
