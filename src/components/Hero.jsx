import { FaSearch } from "react-icons/fa";

export default function Hero({ query, setQuery, onSearch }) {
  return (
    <section className="relative text-white">
      <div className="mx-auto grid max-w-6xl items-end px-4 md:grid-cols-2">
        <div className="py-12 md:py-20">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Easy Steps To Learn Blogging, Tech Tools and Digital Marketing.</h1>
          <p className="mt-5 max-w-md text-sm font-medium text-white/90">
            Explore step-by-step guides on digital marketing, tech tutorials, and earning online – made easy for beginners and creators.
          </p>
          <form onSubmit={onSearch} className="mt-8 flex max-w-md items-center rounded-lg bg-white/20 px-4 py-4 backdrop-blur">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. Search topics like GitHub, Tools, SEO, HTML..."
              className="w-full bg-transparent text-sm text-white placeholder-white/70 outline-none"
            />
            <button type="submit" aria-label="Search posts" className="text-white/80 hover:text-white">
              <FaSearch aria-hidden="true" />
            </button>
          </form>
        </div>
        <div className="hidden justify-center md:flex">
          <img src="/PHOTO.png" alt="Prince Sahani" className="h-[22rem] max-w-full object-contain object-bottom" />
        </div>
      </div>
    </section>
  );
}
