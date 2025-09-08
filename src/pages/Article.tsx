import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../types/store";
import { toast } from "react-toastify";
import { Skeleton } from "../components/Skeleton";

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
        Ooops! Some error, please try letter. <br />
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
        <li className="article-tags bg-black/25">Photography</li>
        <li className="article-tags bg-black/25">Abstract</li>
      </ul>
      <h2 className="text-5xl font-cabinet-grotesk-variable pt-8">ArticleName: {articleId}</h2>
      <div className="text-black/50 pt-4 text-lg">Aug 1, 2021 • 7 min read</div>
      <img src="#" className="h-96 bg-black/15 rounded-md block mt-8" alt="Картинка" />
      <div className="flex gap-4 items-center pt-10">
        <img
          src="https://avatars.mds.yandex.net/get-lpc/12602567/d920d2ed-4c69-4062-8e06-f61cefd46536/orig?width=64&height=64"
          alt="Автарака"
          className="w-12 rounded-full"
        />
        <p className="font-light text-lg font-cabinet-grotesk-variable">Paris Washington</p>
      </div>
      <p className="font-cabinet-grotesk-variable pt-6 text-2xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum reiciendis ratione obcaecati vel odio
        doloremque veritatis beatae libero? Eveniet minus ipsam qui molestias nobis ad ut deleniti nesciunt, impedit
        voluptas.
      </p>
      <p className="pt-6">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus at labore consequatur vel quibusdam error
        obcaecati delectus! Expedita, praesentium quas ipsam veniam ipsa cum? Incidunt fugiat itaque quasi ut rerum?
        Maxime, tempore laudantium. Provident excepturi soluta, saepe fugit dolores sequi vel officiis, asperiores est
        labore distinctio quos voluptatum. Eum qui culpa, pariatur tempora laboriosam magni. Officiis similique
        cupiditate minus eligendi?
      </p>
      <p className="pt-6">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae adipisci iste quidem, assumenda ab nesciunt
        obcaecati saepe est, aut, ex dolor perspiciatis. Nisi architecto officiis cupiditate consequuntur amet ab esse!
        Molestiae facilis consectetur sequi quaerat voluptate dolore porro nobis! Dignissimos molestiae magni maiores
        rerum tenetur, aliquid quisquam! At modi, recusandae corporis tempora, laudantium nihil, consequatur id cum quam
        vel ut! Expedita corrupti inventore numquam non, doloremque eius mollitia corporis at consectetur rerum cumque,
        perferendis vel sed doloribus nisi exercitationem sunt perspiciatis assumenda, quam laborum quos sit! Est
        voluptas possimus delectus. Neque, quia! Nostrum explicabo, illo ipsa aliquid eaque dolorem veritatis dolor rem
        perferendis voluptatem impedit dolores commodi repellendus totam ullam aperiam possimus repudiandae consequuntur
        atque ipsum, nesciunt dolore sed eius.
      </p>
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
