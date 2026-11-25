import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import NotFound from "./NotFound";
import Seo from "../components/Seo";
import { posts } from "../posts";

const categories = {
  "blogs/javascript": {
    title: "JavaScript",
    description: "JavaScript ke notes, tutorials aur practical guides.",
  },
  "blogs/html": {
    title: "HTML",
    description: "HTML seekhne aur projects banane ke liye tutorials.",
  },
  "blogs/seo": {
    title: "SEO",
    description: "Search engines aur website growth ke baare mein guides.",
  },
  "tutorials/github": {
    title: "GitHub Tutorials",
    description: "GitHub ko samajhne aur use karne ke beginner-friendly guides.",
  },
  "tutorials/roadmap": {
    title: "Learning Roadmaps",
    description: "Tech skills seekhne ke liye step-by-step roadmaps.",
  },
  "tutorials/tools": {
    title: "Tech Tools",
    description: "Kaam aur learning ke liye useful technology tools.",
  },
};

export default function CategoryPage() {
  const { section, slug } = useParams();
  const category = categories[`${section}/${slug}`];

  if (!category) return <NotFound />;

  const categoryPosts = posts.filter((post) => post.category.toLowerCase() === slug.toLowerCase());

  return (
    <>
      <Seo
        title={category.title}
        description={category.description}
        path={`/${section}/${slug}`}
      />
      <div className="bg-gradient-to-br from-[#4f6bed] to-[#b95cf4]">
        <Header />
      </div>
      <main className="min-h-[60vh] bg-[#f4f6ff] px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <Link to="/" className="text-sm text-blue-600 hover:underline">← Home</Link>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">{category.title}</h1>
          <p className="mt-2 text-slate-600">{category.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {categoryPosts.map((post) => <PostCard key={post.id} post={post} />)}
            {categoryPosts.length === 0 && (
              <p className="text-slate-600">Is category ke articles jald hi yahan honge.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
