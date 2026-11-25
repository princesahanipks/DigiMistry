import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PostCard from "../components/PostCard";
import Seo from "../components/Seo";
import { posts } from "../posts";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [count, setCount] = useState(9);
  const postsRef = useRef(null);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredPosts = posts.filter((post) => (post.title + post.category).toLowerCase().includes(normalizedQuery));

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  function handleSearch(event) {
    event.preventDefault();
    const trimmedQuery = query.trim();
    setSearchParams(trimmedQuery ? { q: trimmedQuery } : {});
    setCount(9);
    postsRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      <Seo
        title="Tech Learning, Coding Tutorials and Roadmaps"
        description="DigiMistry par JavaScript, HTML, SEO, GitHub aur web development ke practical Hindi tutorials aur beginner roadmaps padhein."
        path="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "DigiMistry",
          url: window.location.origin,
        }}
      />
      <div className="relative overflow-hidden bg-gradient-to-br from-[#4f6bed] to-[#b95cf4]">
        <ul className="rotating-box">
          {Array.from({ length: 10 }).map((_, i) => <li key={i} />)}
        </ul>
        <div className="relative z-10">
          <Header />
          <Hero query={query} setQuery={setQuery} onSearch={handleSearch} />
        </div>
      </div>
      <main id="posts" ref={postsRef} className="bg-[#f4f6ff] pb-12 pt-6">
        <h2 className="mx-auto w-fit border-b-2 border-slate-900 px-16 pb-3 text-2xl font-bold text-slate-900">View the Most Recent Posts</h2>
        <p className="mt-4 text-center text-sm text-slate-600">Here you will find all of the most recent trending information.</p>
        <div className="mx-auto mt-8 flex max-w-6xl flex-wrap justify-center gap-8 px-4">
          {filteredPosts.slice(0, count).map((post) => <PostCard key={post.id} post={post} />)}
          {filteredPosts.length === 0 && <p className="text-slate-600">Koi post nahi mili. Dusra keyword try karo.</p>}
        </div>
        {count < filteredPosts.length && (
          <div className="mt-10 text-center">
            <button onClick={() => setCount(count + 50)} className="rounded-md bg-blue-500 px-8 py-2 font-semibold text-white hover:bg-blue-600">Load More</button>
          </div>
        )}
      </main>
    </div>
  );
}
