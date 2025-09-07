import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { LoginFormType } from "../types/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

export const Login = () => {
  const [formType, setFormType] = useState<LoginFormType>(LoginFormType.login);

  const handleClick = () => {
    if (formType === LoginFormType.login) {
      setFormType(LoginFormType.register);
      return;
    }

    setFormType(LoginFormType.login);
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {formType === LoginFormType.login && <LoginForm />}
      {formType === LoginFormType.register && <RegisterForm />}

      <div className="mt-10 text-center ">
        <div className="inline-block font-semibold text-black hover:text-black/80 cursor-pointer" onClick={handleClick}>
          {formType === LoginFormType.login ? "Register now" : "Login now"}
        </div>
      </div>
    </div>
  );
};
