import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../types/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserLogin, UserLoginSchema } from "../types/Auth";
import classNames from "classnames";
import { useAppSelector } from "../types/store";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const { errors: errorsResponce, isLoading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    resolver: zodResolver(UserLoginSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserLogin> = (payload) => {
    dispatch(
      login({
        payload: {
          ...payload,
          returnSecureToken: true,
        },
        onSuccess: () => {
          navigate("/", {
            replace: true,
          });
        },
      })
    );
  };

  const inputClasses = (inputName: keyof UserLogin) =>
    classNames("form-login-input", { "border-red-600": errors[inputName] });

  return (
    <>
      <h2 className="text-center text-4xl font-cabinet-grotesk-variable">Login</h2>
      <form className="space-y-6 pt-10" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium ">
            Email address
          </label>
          <div className="mt-2">
            <input id="email" type="text" className={inputClasses("email")} {...register("email")} />
          </div>
          {errors.email && <div className="error-msg-login-form">{errors.email.message}</div>}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm/6 font-medium ">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input id="password" type="password" className={inputClasses("password")} {...register("password")} />
          </div>
          {errors.password && <div className="error-msg-login-form">{errors.password.message}</div>}
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-black/80 disabled:bg-black/35"
            disabled={isLoading}
          >
            {isLoading ? "Working..." : "Sign in"}
          </button>
          {errorsResponce && <div className="error-msg-login-form text-center">{errorsResponce}</div>}
        </div>
      </form>
    </>
  );
};
