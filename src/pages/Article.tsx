import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../types/store";
import { toast } from "react-toastify";
import { Skeleton } from "../components/Skeleton";
import { convertDate } from "../utils/convertDate";

type ParamsType = {
  id: string;
};

export const Article = () => {
  const { id: articleId } = useParams<ParamsType>();

  const { entities: articles, errors, isLoading } = useAppSelector((state) => state.articles);

  const article = articles?.find((item) => item.id === articleId);

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="container pt-10">
        <Skeleton classNames="h-[160px] w-[850px] rounded-md" />
        <Skeleton classNames="h-[400px] w-full rounded-md mt-4" />
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

  if (!article) {
    toast.error("Article not found");
    navigate("/404", {
      replace: true,
    });
    return null;
  }

  return (
    <article className="container pt-8">
      <ul className="flex gap-1 ">
        {article.tags.map((tag) => (
          <li key={tag} className="article-tags bg-black/25">
            {tag}
          </li>
        ))}
      </ul>
      <h2 className="text-5xl font-cabinet-grotesk-variable pt-8">{article.title}</h2>
      <div className="text-black/50 pt-4 text-lg">{convertDate.toClient(article.createdAt)} </div>
      <img src="#" className="h-96 bg-black/15 rounded-md block mt-8" alt="Картинка" />
      <div className="flex gap-4 items-center pt-10">
        <img src={article.author.avatarUrl} alt="Автарака" className="w-12 rounded-full" />
        <p className="font-light text-lg font-cabinet-grotesk-variable">{article.author.login}</p>
      </div>
      <p className="font-cabinet-grotesk-variable pt-6 text-2xl">{article.description}</p>
      <p className="pt-6" dangerouslySetInnerHTML={{ __html: article.fullText }}></p>
      <section className="pt-20">
        <h2 className="text-4xl font-cabinet-grotesk-variable">Keep reading</h2>
        <ul className="pt-8 flex flex-col gap-4">
          <li className="flex gap-6">
            <img src="#" className="w-60 h-60 rounded-md bg-black/15" alt="Картинка" />
            <div>
              <h3 className="text-2xl font-cabinet-grotesk-variable">
                Why you don’t need more than 3 pieces of clothing?
              </h3>
              <p className="text-base text-black/50">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi similique officia facilis iure alias
                possimus, nihil molestias sint nulla animi? Debitis quibusdam quo assumenda, aspernatur reprehenderit
                doloribus ex expedita dolore?
              </p>
            </div>
          </li>
          <li className="flex gap-6">
            <img src="#" className="w-60 h-60 rounded-md bg-black/15" alt="Картинка" />
            <div>
              <h3 className="text-2xl font-cabinet-grotesk-variable">
                Why you don’t need more than 3 pieces of clothing?
              </h3>
              <p className="text-base text-black/50">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi similique officia facilis iure alias
                possimus, nihil molestias sint nulla animi? Debitis quibusdam quo assumenda, aspernatur reprehenderit
                doloribus ex expedita dolore?
              </p>
            </div>
          </li>
        </ul>
      </section>
    </article>
  );
};
