import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="block w-full overflow-hidden rounded-lg bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]">
      <div className="flex items-center gap-1.5 px-3 py-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
      </div>
      <div className="aspect-[4/3] w-full" style={{ background: post.bg }}>
        <img src={post.img} alt={post.title} className="h-full w-full object-cover" onError={(event) => (event.currentTarget.style.display = "none")} />
      </div>
      <div className="p-3">
        <p className="flex items-center gap-2 text-xs text-slate-600">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-400 text-[9px] font-bold text-white">P</span>
          PRINCE SAHANI PKS in <span className="font-semibold">{post.category}</span>
        </p>
        <h3 className="mt-2 text-base font-semibold leading-snug text-slate-900">{post.title}</h3>
      </div>
    </Link>
  );
}
