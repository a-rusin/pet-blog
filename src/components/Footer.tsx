export const Footer = () => {
  return (
    <footer className="mt-20">
      <section className="bg-black text-white text-center ">
        <div className="max-w-lg mx-auto">
          <p className="pt-20 text-sm">Our blog</p>
          <h2 className="font-cabinet-grotesk-variable text-5xl pt-3">Stories and interviews</h2>
          <p className="pt-8 text-white/50 text-xl ">
            Subscribe to learn about new product features, the latest in technology, solutions, and updates.
          </p>
          <div className="flex gap-2 pt-10 pb-20">
            <input
              type="text"
              name="email2"
              placeholder="Enter your email"
              className="rounded-md block grow py-3 px-4 text-black focus-visible:border-0 focus-visible:outline-none"
            />
            <button className="basis-24 py-3 px-4">Subscribe</button>
          </div>
        </div>
      </section>
      <section className="container py-10 flex justify-between border-t-2 border-black/10 mt-20 text-black/50 text-sm">
        <p>{new Date().getFullYear()}</p>
        <p>
          Dev Pet Project - Blog by{" "}
          <a
            href="https://github.com/a-rusin"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-solid"
          >
            a-rusin
          </a>
        </p>
      </section>
    </footer>
  );
};
