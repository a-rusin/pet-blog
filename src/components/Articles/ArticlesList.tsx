import { useEffect, useState } from "react";
import { Article } from ".";
import { articlesService } from "../../services/articles.service";
import { Article as IArticle } from "../../types/Article";
import { nanoid } from "nanoid";

export const ArticlesList = () => {
  const [articles, setArticles] = useState<IArticle[] | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await articlesService.getAll();
    console.log(data);
  };

  const handleClick = async () => {
    const data = await articlesService.create({
      id: nanoid(),
      title: "Text",
    });
  };

  return (
    <>
      <button onClick={handleClick}>Create</button>

      <ul className="flex gap-4 pt-20 flex-wrap container">
        <Article />
      </ul>
    </>
  );
};
