import { useEffect } from "react";
import { Article } from ".";
import { articlesService } from "../../services/articles.service";
import { nanoid } from "nanoid";

export const ArticlesList = () => {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await articlesService.getAll();
  };

  const handleClick = async () => {
    await articlesService.create({
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
