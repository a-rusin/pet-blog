import { useEffect, useState } from "react";
import { useAppSelector } from "../types/store";
import { useForm, SubmitHandler } from "react-hook-form";
import { FooterFormSchema, FooterForm as FooterFormType } from "../types/FooterForm";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { http } from "../services/http.service";
import { apiUrls } from "../configs/apiUrl";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { errorHandler } from "../utils/errorHandler";

export const FooterForm = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isEmailSended, setIsEmailSended] = useState(false);
  const [isLoading, setISLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FooterFormType>({
    resolver: zodResolver(FooterFormSchema),
  });

  useEffect(() => {
    if (!user) return;

    setValue("email", user.email);
  }, [user]);

  const onSubmit: SubmitHandler<FooterFormType> = async (payload) => {
    try {
      setISLoading(true);
      const updatedData = {
        id: nanoid(),
        ...payload,
      };
      const url = `${apiUrls.footerForm}/${updatedData.id}`;
      await http.put(url, updatedData);

      toast.success("Success! We'll be in touch");
      setIsEmailSended(true);
      setISLoading(false);
    } catch (error) {
      setISLoading(false);
      const errorMsg = errorHandler(error);
      toast.error(errorMsg);
    }
  };

  const inputClasses = (inputName: keyof FooterFormType) =>
    classNames(
      "border-2 rounded-md block grow py-3 px-4 text-black focus-visible:border-2 focus-visible:outline-none ",
      {
        "border-red-600": errors[inputName],
      }
    );

  if (isEmailSended) {
    return <div className="text-center pt-10 pb-20">Thank you for email! We'll be in touch!</div>;
  }

  return (
    <div className="pt-10 pb-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" ">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter your email"
              className={inputClasses("email")}
              {...register("email")}
            />

            <button
              className="basis-28 py-3 px-4 rounded-lg bg-white/10 block shrink-0 disabled:bg-white/10 disabled:text-white/25"
              disabled={isLoading}
            >
              {isLoading ? "Working..." : "Subscribe"}
            </button>
          </div>
          <div>{errors.email && <div className="error-msg-login-form text-left">{errors.email.message}</div>}</div>
        </div>
      </form>
    </div>
  );
};
