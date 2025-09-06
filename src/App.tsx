function App() {
  return (
    <div className="App font-cabinet-grotesk min-h-screen flex flex-col">
      <header className="container">
        <nav className="flex justify-between items-center h-20">
          <a href="#" className="font-cabinet-grotesk-variable text-3xl inline-block">
            My Blog
          </a>
          <a href="#" className="font-light text-black/50 text-xl hover:underline hover:decoration-solid">
            Login
          </a>
        </nav>
        <div className="text-center">
          <h1 className="font-cabinet-grotesk-variable text-5xl pt-20">The Food Ninja Blog</h1>
          <p className="text-black/50 pt-2 text-base">A blog about food, experiences, and recipes.</p>
          <div className="flex gap-2 justify-between items-center h-12 px-4 border-2 border-black/20 rounded-md max-w-sm mx-auto mt-10">
            <input
              type="text"
              placeholder="Search for articles"
              className="bg-transparent grow text-base rounded-none focus-visible:border-0 focus-visible:outline-none"
              name="query2"
            />
            <div className="w-5 h-5 bg-searh-icon bg-center bg-contain bg-no-repeat"></div>
          </div>
        </div>
      </header>
      <main className="grow">
        <ul className="flex gap-4 pt-20 flex-wrap container">
          <li className="w-96">
            <div className="relative">
              <img
                src="https://avatars.mds.yandex.net/get-lpc/12602567/6cbfdbd7-3c7d-4e91-89a4-2e364a7ef01b/orig?width=768&height=660"
                alt="Картинка"
                className="w-full"
              />
              <ul className="absolute top-4 left-4 flex gap-1">
                <li className="py-2 px-3 text-white bg-white/20 rounded-md">Photography</li>
                <li className="py-2 px-3 text-white bg-white/20 rounded-md">Abstract</li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold pt-6 text-2xl font-cabinet-grotesk-variable">
                Photography, the best hobby to have, Express yourself.
              </h2>
              <ul className="flex gap-4 pt-4 items-center">
                <li className="flex gap-1 items-center">
                  <img
                    src="https://avatars.mds.yandex.net/get-lpc/12602567/d920d2ed-4c69-4062-8e06-f61cefd46536/orig?width=64&height=64"
                    alt="Автарака"
                    className="w-8 rounded-full"
                  />
                  <p className="font-light text-base">Paris Washington</p>
                </li>
                <li className="font-light text-base text-black/50">June 28, 2018</li>
                <li className="font-light text-base text-black/50 pl-5 bg-share-icon bg-left bg-no-repeat bg-[length:15px]">
                  1K shares
                </li>
              </ul>
              <p className="font-light text-base text-black/50 pt-4">
                Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici
                consequat justo enim. Venenatis eget adipiscing luctus lorem.
              </p>
              <a href="#" className="inline-block text-black text-base mt-4 py-2 border-black border-b-2">
                View Post
              </a>
            </div>
          </li>
        </ul>
        <section className="bg-black text-white text-center mt-20">
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
      </main>
      <footer className="container py-10 flex justify-between border-t-2 border-black/10 mt-20 text-black/50 text-sm">
        <p>{new Date().getFullYear()}</p>
        <p>
          Dev Pet Project - Blog by{" "}
          <a href="https://github.com/a-rusin" target="_blank" className="underline decoration-solid">
            a-rusin
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
