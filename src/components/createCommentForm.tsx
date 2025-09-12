import { SubmitHandler, useForm } from "react-hook-form";
import { CommentForm, CommentFormSchema } from "../types/Comment";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";

export const CreateCommentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentForm>({
    resolver: zodResolver(CommentFormSchema),
  });

  const onSubmit: SubmitHandler<CommentForm> = (payload) => {
    console.log(payload);
  };

  const inputClasses = (inputName: keyof CommentForm) =>
    classNames("form-login-input resize-none h-40 ", { "border-red-600": errors[inputName] });

  return (
    <form className="space-y-6 pt-10" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="content" className="block text-sm/6 font-medium ">
          Your comment
        </label>
        <div className="mt-2">
          <textarea id="text" className={inputClasses("content")} {...register("content")} />
        </div>
        {errors.content && <div className="error-msg-login-form">{errors.content.message}</div>}
      </div>

      <div>
        <button
          type="submit"
          className="flex justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-black/80 disabled:bg-black/35"
        >
          Add comment
        </button>
      </div>
    </form>
  );
};
