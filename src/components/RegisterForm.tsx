import { useForm, SubmitHandler } from "react-hook-form";
import { UserRegister, UserRegisterSchema } from "../types/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import classnames from "classnames";
import { useAppDispatch } from "../types/store";
import { register as signUp } from "../store/authSlice";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>({
    resolver: zodResolver(UserRegisterSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<UserRegister> = (data) => {
    dispatch(signUp(data));
  };

  const inputClasses = (inputName: keyof UserRegister) =>
    classnames("form-login-input", { "border-red-600": errors[inputName] });

  return (
    <>
      <h2 className="text-center text-4xl font-cabinet-grotesk-variable">Register</h2>
      <form className="space-y-6 pt-10" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium ">
            Email address
          </label>
          <div className="mt-2">
            <input id="email" type="text" className={inputClasses("email")} {...register("email")} />
          </div>
          {errors.email && <div className="text-red-600 font-bold text-sm pt-1">{errors.email.message}</div>}
        </div>

        <div>
          <label htmlFor="login" className="block text-sm/6 font-medium ">
            Login
          </label>
          <div className="mt-2">
            <input id="login" type="text" className={inputClasses("login")} {...register("login")} />
          </div>
          {errors.login && <div className="text-red-600 font-bold text-sm pt-1">{errors.login.message}</div>}
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
          {errors.password && <div className="text-red-600 font-bold text-sm pt-1">{errors.password.message}</div>}
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-black/80 "
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
};
