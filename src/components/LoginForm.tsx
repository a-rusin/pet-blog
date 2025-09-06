export const LoginForm = () => {
  return (
    <>
      <h2 className="text-center text-4xl font-cabinet-grotesk-variable">Login</h2>
      <form className="space-y-6 pt-10">
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium ">
            Email address
          </label>
          <div className="mt-2">
            <input id="email" type="email" name="email" required className="form-login-input" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm/6 font-medium ">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input id="password" type="password" name="password" required className="form-login-input" />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-black/80 "
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  );
};
