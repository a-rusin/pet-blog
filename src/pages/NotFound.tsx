import { Link } from "react-router-dom";
import { routes } from "../configs/routes";

export const NotFound = () => {
  return (
    <section className="container text-center  mt-20">
      <div className=" font-cabinet-grotesk-variable text-5xl">Oops! Page not found!</div>
      <Link className="pt-10 inline-block underline decoration-solid text-lg text-black/50" to={routes.home}>
        Go home
      </Link>
    </section>
  );
};
