export const Hero = () => {
  return (
    <div className="text-center">
      <h1 className="font-cabinet-grotesk-variable text-5xl pt-20">My Pet Blog</h1>
      <p className="text-black/50 pt-2 text-base">A blog about everything.</p>
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
  );
};
