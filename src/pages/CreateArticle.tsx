import { SubmitHandler, useForm } from "react-hook-form";
import { ArticleCreateUpdateForm, articlesSchemaCreateUpdateForm } from "../types/Article";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";

export const CreateArticle = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleCreateUpdateForm>({
    resolver: zodResolver(articlesSchemaCreateUpdateForm),
  });

  const onSubmit: SubmitHandler<ArticleCreateUpdateForm> = (payload) => {
    console.log(payload);
  };

  const inputClasses = (inputName: keyof ArticleCreateUpdateForm) =>
    classNames("form-login-input", { "border-red-600": errors[inputName] });

  return (
    <div className="container pt-8">
      <h2 className="text-5xl font-cabinet-grotesk-variable pt-8">Create new article:</h2>
      <form className="space-y-6 pt-10" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title" className="block text-lg font-medium ">
            Title:
          </label>
          <div className="mt-2">
            <input id="title" type="text" className={inputClasses("title")} {...register("title")} />
          </div>
          {errors.title && <div className="error-msg-login-form">{errors.title.message}</div>}
        </div>
        <div>
          <label htmlFor="tags" className="block text-lg font-medium ">
            Tags:
          </label>
          <div className="mt-2">
            <input id="tags" type="text" className={inputClasses("tags")} {...register("tags")} />
          </div>
          {errors.tags && <div className="error-msg-login-form">{errors.tags.message}</div>}
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium ">
            Description:
          </label>
          <div className="mt-2">
            <input id="description" type="text" className={inputClasses("description")} {...register("description")} />
          </div>
          {errors.description && <div className="error-msg-login-form">{errors.description.message}</div>}
        </div>
        <div>
          <label htmlFor="fullText" className="block text-lg font-medium ">
            Full text:
          </label>
          <div className="mt-2">
            <input id="fullText" type="text" className={inputClasses("fullText")} {...register("fullText")} />
          </div>
          {errors.fullText && <div className="error-msg-login-form">{errors.fullText.message}</div>}
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
