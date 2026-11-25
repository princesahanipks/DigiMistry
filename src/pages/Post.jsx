import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaComment,
  FaCopy,
  FaFacebookF,
  FaHeart,
  FaLinkedinIn,
  FaRegHeart,
  FaShareAlt,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { getContent } from "../Content";
import { posts } from "../posts";
import NotFound from "./NotFound";
import Seo from "../components/Seo";

export default function Post() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;

    try {
      const savedLike = JSON.parse(localStorage.getItem(`post-like-${slug}`));
      const savedComments = JSON.parse(localStorage.getItem(`post-comments-${slug}`)) || [];
      setLiked(Boolean(savedLike?.liked));
      setLikeCount(Number(savedLike?.count) || 0);
      setComments(savedComments);
    } catch {
      setLiked(false);
      setLikeCount(0);
      setComments([]);
    }
  }, [slug]);

  if (!post) return <NotFound showHeader={false} />;

  const postUrl = `${window.location.origin}/blog/${slug}`;

  const toggleLike = () => {
    const nextLiked = !liked;
    const nextCount = Math.max(0, likeCount + (nextLiked ? 1 : -1));

    setLiked(nextLiked);
    setLikeCount(nextCount);
    localStorage.setItem(`post-like-${slug}`, JSON.stringify({ liked: nextLiked, count: nextCount }));
  };

  const addComment = (event) => {
    event.preventDefault();
    const name = commentName.trim();
    const text = commentText.trim();
    if (!name || !text) return;

    const nextComments = [
      ...comments,
      {
        id: Date.now(),
        name,
        text,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      },
    ];

    setComments(nextComments);
    setCommentName("");
    setCommentText("");
    localStorage.setItem(`post-comments-${slug}`, JSON.stringify(nextComments));
  };

  const copyPostLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this post link:", postUrl);
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post.title,
        text: post.title,
        url: postUrl,
      });
    } else {
      copyPostLink();
    }
  };

  const shareOn = (network) => {
    const encodedUrl = encodeURIComponent(postUrl);
    const encodedTitle = encodeURIComponent(post.title);
    const links = {
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    window.open(links[network], "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Seo
        title={post.title}
        description={`${post.title} - DigiMistry par easy Hindi guide aur useful tech learning resources.`}
        path={`/blog/${slug}`}
        image={post.img}
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          image: new URL(post.img, window.location.origin).href,
          author: {
            "@type": "Person",
            name: "Prince Sahani",
          },
          publisher: {
            "@type": "Organization",
            name: "DigiMistry",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": postUrl,
          },
        }}
      />
      <Link to="/" className="text-sm text-blue-600">← Home</Link>
      <h1 className="mt-4 text-3xl font-bold">{post.title}</h1>
      <article className="prose lg:prose-lg mt-6">
        <ReactMarkdown>{getContent(slug)}</ReactMarkdown>
      </article>

      <div className="mt-8 rounded-xl border border-zinc-200 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={toggleLike}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              liked
                ? "border-red-200 bg-red-50 text-red-600"
                : "border-zinc-200 text-zinc-700 hover:border-red-200 hover:text-red-600"
            }`}
            aria-label={liked ? "Unlike this post" : "Like this post"}
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
            <span>{likeCount} {likeCount === 1 ? "Like" : "Likes"}</span>
          </button>

          <span className="flex items-center gap-2 text-sm text-zinc-600">
            <FaComment />
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </span>

          <div className="ml-auto flex flex-wrap gap-2">
            <button type="button" onClick={copyPostLink} className="grid h-9 w-9 place-items-center rounded-full bg-zinc-800 text-white hover:bg-zinc-700" title="Copy link" aria-label="Copy post link">
              <FaCopy />
            </button>
            <button type="button" onClick={() => shareOn("whatsapp")} className="grid h-9 w-9 place-items-center rounded-full bg-green-500 text-white hover:bg-green-600" title="Share on WhatsApp" aria-label="Share on WhatsApp">
              <FaWhatsapp />
            </button>
            <button type="button" onClick={() => shareOn("facebook")} className="grid h-9 w-9 place-items-center rounded-full bg-blue-600 text-white hover:bg-blue-700" title="Share on Facebook" aria-label="Share on Facebook">
              <FaFacebookF />
            </button>
            <button type="button" onClick={() => shareOn("telegram")} className="grid h-9 w-9 place-items-center rounded-full bg-sky-500 text-white hover:bg-sky-600" title="Share on Telegram" aria-label="Share on Telegram">
              <FaTelegramPlane />
            </button>
            <button type="button" onClick={() => shareOn("linkedin")} className="grid h-9 w-9 place-items-center rounded-full bg-[#0a66c2] text-white hover:bg-[#084f96]" title="Share on LinkedIn" aria-label="Share on LinkedIn">
              <FaLinkedinIn />
            </button>
            <button type="button" onClick={nativeShare} className="grid h-9 w-9 place-items-center rounded-full bg-purple-600 text-white hover:bg-purple-700" title="More share options" aria-label="Share post">
              <FaShareAlt />
            </button>
          </div>
        </div>
        {copied && <p className="mt-3 text-sm font-semibold text-green-600">Post link copied!</p>}
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Comments</h2>
        <form onSubmit={addComment} className="mt-4 rounded-xl border border-zinc-200 p-4">
          <input
            value={commentName}
            onChange={(event) => setCommentName(event.target.value)}
            type="text"
            required
            maxLength={50}
            placeholder="Your name"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
          <textarea
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            required
            maxLength={1000}
            rows={4}
            placeholder="Write a comment..."
            className="mt-3 w-full resize-y rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
          <button type="submit" className="mt-3 rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Post Comment
          </button>
        </form>

        <div className="mt-5 space-y-3">
          {comments.length === 0 ? (
            <p className="text-sm text-zinc-500">No comments yet. Start the conversation.</p>
          ) : (
            comments.map((comment) => (
              <article key={comment.id} className="rounded-lg border border-zinc-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-zinc-900">{comment.name}</h3>
                  <time className="text-xs text-zinc-500">{comment.date}</time>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-700">{comment.text}</p>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
