import { SubmitHandler, useForm } from "react-hook-form";
import {
  ArticleClient,
  ArticleCreateUpdateForm,
  ArticleServer,
  articlesSchemaCreateUpdateForm,
} from "../types/Article";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../types/store";
import { createUpdateArticle } from "../store/articlesSlice";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { articlesService } from "../services/articles.service";
import { errorHandler } from "../utils/errorHandler";
import { routes } from "../configs/routes";
import { Skeleton } from "../components/Skeleton";

type Params = {
  articleId?: string;
};

export const CreateUpdateArticle = () => {
  const { articleId } = useParams<Params>();
  const [article, setArticle] = useState<ArticleServer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
  } = useForm<ArticleCreateUpdateForm>({
    resolver: zodResolver(articlesSchemaCreateUpdateForm),
  });

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = async () => {
    try {
      if (articleId) {
        const data = await articlesService.getById(articleId);
        setArticle(data);
        if (data) {
          (Object.keys(data) as Array<keyof typeof data>).forEach((item) => {
            const updatedData = item === "tags" ? data[item].join(",") : data[item];
            //@ts-ignore
            setValue(item, updatedData);
          });
        }
      }
    } catch (error: unknown) {
      const errors = errorHandler(error);
      setErrors(errors);
      navigate(routes.user("my-articles", false), {
        replace: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<ArticleCreateUpdateForm> = (payload) => {
    const updatedData: ArticleClient = articleId
      ? {
          ...article!,
          ...payload,
          author: user!,
          tags: payload.tags.split(","),
        }
      : {
          ...payload,
          id: nanoid(),
          author: user!,
          createdAt: new Date().toISOString(),
          likes: undefined,
          views: undefined,
          tags: payload.tags.split(","),
        };
    dispatch(
      createUpdateArticle({
        payload: updatedData,
        cb: () => {
          toast.success("Article success created/updated!");
          if (articleId) {
            navigate(routes.user("my-articles", false));
          } else {
            navigate("/");
          }
        },
      })
    );
  };

  const inputClasses = (inputName: keyof ArticleCreateUpdateForm) =>
    classNames("form-login-input", { "border-red-600": formErrors[inputName] });

  if (isLoading) {
    return (
      <div className="container pt-8">
        <h2 className="text-5xl font-cabinet-grotesk-variable pt-8">
          {articleId ? "Edit Artcile:" : "Create new article"}
        </h2>
        <ul className="pt-8">
          {[1, 2, 3].map((item) => (
            <li key={item} className="py-4">
              {" "}
              <Skeleton classNames="h-[48px] w-full rounded-md grow" />
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

  return (
    <div className="container pt-8">
      <h2 className="text-5xl font-cabinet-grotesk-variable pt-8">
        {articleId ? "Edit Artcile:" : "Create new article"}
      </h2>
      <form className="space-y-6 pt-10" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title" className="block text-lg font-medium ">
            Title:
          </label>
          <div className="mt-2">
            <input id="title" type="text" className={inputClasses("title")} {...register("title")} />
          </div>
          {formErrors.title && <div className="error-msg-login-form">{formErrors.title.message}</div>}
        </div>
        <div>
          <label htmlFor="tags" className="block text-lg font-medium ">
            Tags <strong>(separated by commas)</strong>:
          </label>
          <div className="mt-2">
            <input id="tags" type="text" className={inputClasses("tags")} {...register("tags")} />
          </div>
          {formErrors.tags && <div className="error-msg-login-form">{formErrors.tags.message}</div>}
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium ">
            Description:
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              className={inputClasses("description") + " resize-none h-40"}
              {...register("description")}
            />
          </div>
          {formErrors.description && <div className="error-msg-login-form">{formErrors.description.message}</div>}
        </div>
        <div>
          <label htmlFor="fullText" className="block text-lg font-medium ">
            Full text <strong>(can use HTML mark up)</strong>:
          </label>
          <div className="mt-2">
            <textarea
              id="fullText"
              className={inputClasses("fullText") + " resize-none h-40"}
              {...register("fullText")}
            />
          </div>
          {formErrors.fullText && <div className="error-msg-login-form">{formErrors.fullText.message}</div>}
        </div>
        <div>
          <button
            type="submit"
            className="block w-56 mx-auto rounded-md bg-black px-3 py-3 text-base font-semibold text-white hover:bg-black/80 disabled:bg-black/35"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
